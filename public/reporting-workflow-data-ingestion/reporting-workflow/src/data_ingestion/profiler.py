"""
DataProfiler: computes per-column statistics, missing-value and outlier
reports, and suggests (and can apply) cleaning actions.
"""
import logging
from typing import Any, List, Optional

import numpy as np
import pandas as pd

from .profile import ColumnProfile, DataProfile

logger = logging.getLogger(__name__)


class DataProfiler:
    """Profiles a DataFrame and generates/applies cleaning suggestions."""

    def __init__(self, config: dict = None):
        self.config = config or {}
        self.missing_threshold = self.config.get("missing_threshold", 0.8)
        self.impute_threshold = self.config.get("impute_threshold", 0.1)
        self.outlier_method = self.config.get("outlier_method", "iqr")  # 'iqr' | 'zscore'
        self.zscore_threshold = self.config.get("zscore_threshold", 3)
        self.auto_clean = self.config.get("auto_clean", False)

        # Populated after profile() runs; used by apply_cleaning() when no
        # explicit action list is supplied.
        self.columns: dict[str, ColumnProfile] = {}

    # ------------------------------------------------------------------ #
    # Profiling
    # ------------------------------------------------------------------ #
    def profile(self, df: pd.DataFrame) -> DataProfile:
        logger.info("Profiling DataFrame with shape %s", df.shape)

        profiles: dict[str, ColumnProfile] = {}
        missing_summary: dict[str, float] = {}
        outlier_summary: dict[str, int] = {}
        recommendations: List[str] = []

        n_rows = max(len(df), 1)

        for col in df.columns:
            series = df[col]
            dtype = str(series.dtype)
            null_count = int(series.isna().sum())
            null_percent = null_count / n_rows
            unique_count = int(series.nunique(dropna=False))
            missing_summary[col] = null_percent

            outliers: Optional[List[Any]] = None

            if pd.api.types.is_numeric_dtype(series):
                stats = {
                    "mean": _safe_float(series.mean()),
                    "std": _safe_float(series.std()),
                    "min": _safe_float(series.min()),
                    "max": _safe_float(series.max()),
                    "q25": _safe_float(series.quantile(0.25)),
                    "q50": _safe_float(series.median()),
                    "q75": _safe_float(series.quantile(0.75)),
                }
                outliers = self._detect_outliers(series)
                outlier_summary[col] = len(outliers)
            else:
                mode = series.mode()
                value_counts = series.value_counts()
                stats = {
                    "top": mode.iloc[0] if not mode.empty else None,
                    "freq": int(value_counts.iloc[0]) if not value_counts.empty else 0,
                }
                outlier_summary[col] = 0

            cleaning_actions = self._suggest_cleaning(col, series, dtype, null_percent)

            profiles[col] = ColumnProfile(
                name=col,
                dtype=dtype,
                null_count=null_count,
                null_percent=null_percent,
                unique_count=unique_count,
                stats=stats,
                outliers=outliers or None,
                suggested_cleaning=cleaning_actions,
            )
            recommendations.extend(cleaning_actions)

        self.columns = profiles  # cache for apply_cleaning()

        return DataProfile(
            original_shape=df.shape,
            columns=profiles,
            missing_summary=missing_summary,
            outlier_summary=outlier_summary,
            recommendations=list(dict.fromkeys(recommendations)),  # de-dup, keep order
            sample_data=df.head(5),
        )

    def _suggest_cleaning(self, col, series, dtype, null_percent) -> List[str]:
        actions: List[str] = []

        if null_percent > self.missing_threshold:
            actions.append(
                f"Drop column '{col}' (>{self.missing_threshold * 100:.0f}% missing)"
            )
        elif null_percent > self.impute_threshold:
            if pd.api.types.is_numeric_dtype(series):
                actions.append(f"Impute missing values in '{col}' with median")
            else:
                actions.append(f"Impute missing values in '{col}' with mode")

        if pd.api.types.is_object_dtype(series) or pd.api.types.is_string_dtype(series):
            if self._looks_like_date(series.dropna()):
                actions.append(f"Convert '{col}' to datetime")

        return actions

    def _detect_outliers(self, series: pd.Series) -> List[Any]:
        """Return a sample (up to 10) of outlier values using the configured method."""
        data = series.dropna()
        if len(data) == 0:
            return []

        if self.outlier_method == "iqr":
            q1, q3 = data.quantile(0.25), data.quantile(0.75)
            iqr = q3 - q1
            lower, upper = q1 - 1.5 * iqr, q3 + 1.5 * iqr
            outliers = data[(data < lower) | (data > upper)]
        elif self.outlier_method == "zscore":
            std = data.std()
            if std == 0 or pd.isna(std):
                return []
            zscores = (data - data.mean()) / std
            outliers = data[zscores.abs() > self.zscore_threshold]
        else:
            raise ValueError(f"Unknown outlier method: {self.outlier_method}")

        return [_safe_float(v) for v in outliers.head(10).tolist()]

    @staticmethod
    def _looks_like_date(series: pd.Series) -> bool:
        """Heuristic: try to parse a small sample as dates."""
        sample = series.head(10)
        if len(sample) == 0:
            return False
        try:
            pd.to_datetime(sample, errors="raise", format="mixed")
            return True
        except (ValueError, TypeError):
            return False

    # ------------------------------------------------------------------ #
    # Cleaning
    # ------------------------------------------------------------------ #
    def apply_cleaning(self, df: pd.DataFrame, actions: List[str] = None) -> pd.DataFrame:
        """
        Apply cleaning actions to a DataFrame.

        :param actions: explicit list of action strings (as produced by
            profile().recommendations). If None, all non-conflicting
            recommendations from the last profile() call are applied.
        """
        if actions is None:
            actions = self._default_actions()

        df_clean = df.copy()
        for action in actions:
            if action.startswith("Drop column"):
                col = action.split("'")[1]
                if col in df_clean.columns:
                    df_clean.drop(columns=[col], inplace=True)
                    logger.info("Dropped column '%s'", col)

            elif action.startswith("Impute missing values in"):
                col = action.split("'")[1]
                if col not in df_clean.columns:
                    continue
                if "median" in action:
                    val = df_clean[col].median()
                elif "mode" in action:
                    m = df_clean[col].mode()
                    val = m.iloc[0] if not m.empty else None
                else:
                    continue
                df_clean[col] = df_clean[col].fillna(val)
                logger.info("Imputed '%s' with %r", col, val)

            elif action.startswith("Convert"):
                col = action.split("'")[1]
                if col in df_clean.columns:
                    df_clean[col] = pd.to_datetime(df_clean[col], errors="coerce")
                    logger.info("Converted '%s' to datetime", col)

        return df_clean

    def _default_actions(self) -> List[str]:
        """Non-conflicting default actions: drop takes priority over impute."""
        actions: List[str] = []
        for prof in self.columns.values():
            for action in prof.suggested_cleaning:
                actions.append(action)
        return list(dict.fromkeys(actions))


def _safe_float(value) -> Optional[float]:
    """Convert numpy scalars to plain python floats; pass NaN through as None."""
    if value is None:
        return None
    try:
        f = float(value)
    except (TypeError, ValueError):
        return None
    return None if np.isnan(f) else f
