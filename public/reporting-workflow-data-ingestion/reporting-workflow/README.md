# AI-Powered Reporting Workflow — Data Ingestion & Profiling

This is Module 1 of the four-stage reporting pipeline:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Data          │     │   Insight       │     │   Summary       │     │   Presentation  │
│   Ingestion     │────▶│   Generation    │────▶│   Generation    │────▶│   Generation    │
│   & Profiling   │     │   (AI Layer)    │     │   (LLM)         │     │   (PPTX/PDF)    │
│   ← this repo   │     │   (not built)   │     │   (not built)   │     │   (not built)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## What's implemented

`src/data_ingestion/`
- **`loader.py`** — `DataLoader.load(source)`: reads CSV, XLSX/XLS, or JSON files,
  or queries a database via SQLAlchemy (`{"connection_string": ..., "query"|"table": ...}`).
- **`profiler.py`** — `DataProfiler`: per-column stats (numeric: mean/std/min/max/quartiles;
  categorical: top value/frequency), missing-value %, IQR or Z-score outlier detection,
  and cleaning suggestions (drop high-missing columns, impute, convert date-like strings).
  `apply_cleaning()` executes those suggestions.
- **`profile.py`** — `ColumnProfile` / `DataProfile` dataclasses; `DataProfile.to_dict()`
  gives a JSON-serialisable summary (useful as LLM prompt input for the next stage).
- **`__init__.py`** — `ingest_and_profile(source, config)`, the single entry point.

`src/utils/logging.py` — shared logging setup.
`config.yaml` — default thresholds/settings for all four (planned) stages.
`tests/test_ingestion.py` — runnable smoke test (verified passing).

## Usage

```python
from src.data_ingestion import ingest_and_profile

profile = ingest_and_profile("sales.csv", config={"auto_clean": True})

print(profile.original_shape)          # (rows, cols) before cleaning
print(profile.missing_summary)         # {"col": null_fraction, ...}
print(profile.outlier_summary)         # {"col": outlier_count, ...}
print(profile.recommendations)         # ["Drop column 'x' (...)", ...]
print(profile.cleaned_df.head())       # cleaned DataFrame (or raw df if auto_clean=False)
print(profile.to_dict())               # JSON-ready summary, e.g. for an LLM prompt
```

Database source:

```python
profile = ingest_and_profile(
    {"connection_string": "postgresql://user:pass@host/db", "table": "sales"},
    config={"outlier_method": "zscore", "zscore_threshold": 2.5},
)
```

Run the smoke test:

```bash
pip install -r requirements.txt
python tests/test_ingestion.py
```

## Config options (`config.yaml` → `data_ingestion:`)

| Key | Default | Meaning |
|---|---|---|
| `missing_threshold` | `0.8` | Drop a column if null fraction exceeds this |
| `impute_threshold` | `0.1` | Impute (median/mode) if null fraction exceeds this but is below `missing_threshold` |
| `outlier_method` | `iqr` | `iqr` or `zscore` |
| `zscore_threshold` | `3` | Z-score cutoff when `outlier_method: zscore` |
| `auto_clean` | `false` | If true, `ingest_and_profile()` also returns a cleaned DataFrame |

## Notes / known limitations

- Database ingestion needs `sqlalchemy` (and a driver like `psycopg2`/`pymysql`)
  installed; it's imported lazily so file-based ingestion works without it.
- Date detection is heuristic (samples first 10 non-null values); override by
  listing known date columns manually if it misfires on ambiguous data.
- Outlier lists cap at 10 sample values per column (avoids huge payloads when
  passing profiles to an LLM downstream).

## Next steps (not built yet)

1. **Insight Generation** — trend/seasonality decomposition, correlation analysis,
   anomaly detection, then an LLM call (profile + sample data) to rank natural-language insights.
2. **Summary Generation** — LLM call turning insights into an executive summary.
3. **Presentation Generation** — `python-pptx` + `matplotlib`/`plotly` slide deck built from a template.

Each should follow the same pattern as this module: a `run()`-style entry point,
a config-driven class, dataclass outputs, and a smoke test.
