"""Data classes describing profiling results."""
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

import pandas as pd


@dataclass
class ColumnProfile:
    name: str
    dtype: str
    null_count: int
    null_percent: float
    unique_count: int
    stats: Dict[str, Any]                       # numeric: mean/std/min/max/q25/q50/q75
                                                  # categorical: top/freq
    outliers: Optional[List[Any]] = None
    suggested_cleaning: List[str] = field(default_factory=list)


@dataclass
class DataProfile:
    original_shape: tuple
    columns: Dict[str, ColumnProfile]
    missing_summary: Dict[str, float]            # column -> null percent
    outlier_summary: Dict[str, int]              # column -> count of outliers
    recommendations: List[str]
    sample_data: pd.DataFrame
    cleaned_df: Optional[pd.DataFrame] = None    # populated by ingest_and_profile()

    def to_dict(self) -> dict:
        """JSON-friendly summary (drops the raw DataFrame fields)."""
        return {
            "original_shape": list(self.original_shape),
            "missing_summary": self.missing_summary,
            "outlier_summary": self.outlier_summary,
            "recommendations": self.recommendations,
            "columns": {
                name: {
                    "dtype": col.dtype,
                    "null_count": int(col.null_count),
                    "null_percent": round(col.null_percent, 4),
                    "unique_count": int(col.unique_count),
                    "stats": col.stats,
                    "outliers": col.outliers,
                    "suggested_cleaning": col.suggested_cleaning,
                }
                for name, col in self.columns.items()
            },
        }
