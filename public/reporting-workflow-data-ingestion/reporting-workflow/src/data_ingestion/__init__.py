"""
Data Ingestion & Profiling module.

Public entry point: ingest_and_profile(source, config)
"""
import logging

from .loader import DataLoader
from .profiler import DataProfiler
from .profile import DataProfile, ColumnProfile

logger = logging.getLogger(__name__)

__all__ = [
    "DataLoader",
    "DataProfiler",
    "DataProfile",
    "ColumnProfile",
    "ingest_and_profile",
]


def ingest_and_profile(source, config: dict = None) -> DataProfile:
    """
    Load data from `source` and produce a DataProfile.

    :param source: file path (str/Path) for CSV/XLSX/JSON, or a dict
        {'connection_string': ..., 'query': ...} / {'connection_string': ..., 'table': ...}
        for database sources.
    :param config: optional dict of settings (see config.yaml for keys).
    :return: DataProfile instance. `profile.cleaned_df` holds the (optionally
        auto-cleaned) DataFrame for downstream stages.
    """
    config = config or {}

    loader = DataLoader()
    df = loader.load(source)
    logger.info("Loaded data with shape %s", df.shape)

    profiler = DataProfiler(config)
    profile = profiler.profile(df)

    if config.get("auto_clean", False):
        profile.cleaned_df = profiler.apply_cleaning(df)
        logger.info(
            "Auto-cleaning applied: %s -> %s",
            profile.original_shape,
            profile.cleaned_df.shape,
        )
    else:
        profile.cleaned_df = df

    return profile
