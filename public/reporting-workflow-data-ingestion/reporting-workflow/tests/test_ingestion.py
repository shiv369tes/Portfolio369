"""
Quick smoke test for the Data Ingestion & Profiling module.
Run with: python tests/test_ingestion.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pandas as pd
from src.data_ingestion import ingest_and_profile
from src.utils.logging import setup_logging

setup_logging("INFO")

SAMPLE_PATH = Path(__file__).resolve().parent / "sample.csv"


def make_sample_csv():
    df = pd.DataFrame(
        {
            "date": ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"],
            "sales": [100, 200, 300, 250, 9000],   # 9000 is an outlier
            "region": ["North", "South", "North", "East", "North"],
            "mostly_missing": [None, None, None, None, None],  # 100% missing -> should be dropped
        }
    )
    df.to_csv(SAMPLE_PATH, index=False)
    return SAMPLE_PATH


def main():
    path = make_sample_csv()

    # 1. Profile without auto-clean
    profile = ingest_and_profile(str(path), config={"auto_clean": False})
    print("\n=== PROFILE (no auto-clean) ===")
    print("Original shape:", profile.original_shape)
    print("Missing summary:", profile.missing_summary)
    print("Outlier summary:", profile.outlier_summary)
    print("Recommendations:")
    for r in profile.recommendations:
        print("  -", r)
    print("Sample data:\n", profile.sample_data)
    assert profile.cleaned_df.shape == profile.original_shape, "cleaned_df should equal raw df when auto_clean=False"

    # 2. Profile WITH auto-clean
    profile2 = ingest_and_profile(str(path), config={"auto_clean": True})
    print("\n=== PROFILE (auto-clean) ===")
    print("Original shape:", profile2.original_shape)
    print("Cleaned shape:", profile2.cleaned_df.shape)
    print("Cleaned dtypes:\n", profile2.cleaned_df.dtypes)
    assert "mostly_missing" not in profile2.cleaned_df.columns, "high-missing column should be dropped"
    assert pd.api.types.is_datetime64_any_dtype(profile2.cleaned_df["date"]), "date column should be converted"

    # 3. Sanity check on outlier detection
    sales_outliers = profile.columns["sales"].outliers
    print("\nDetected sales outliers:", sales_outliers)
    assert sales_outliers and 9000 in sales_outliers, "9000 should be flagged as an outlier"

    # 4. Sanity check to_dict() is JSON-serialisable
    import json
    json.dumps(profile.to_dict())
    print("\nto_dict() JSON-serialisable: OK")

    print("\nALL CHECKS PASSED")


if __name__ == "__main__":
    main()
