"""
DataLoader: loads tabular data from files (CSV/XLSX/JSON) or a database
(via SQLAlchemy) into a pandas DataFrame.
"""
from pathlib import Path
import logging

import pandas as pd

logger = logging.getLogger(__name__)


class DataLoader:
    """Loads data from a file path or a database source dict."""

    SUPPORTED_EXTENSIONS = {".csv", ".xlsx", ".xls", ".json"}

    @staticmethod
    def load(source, **kwargs) -> pd.DataFrame:
        """
        Load data from a file or database.

        :param source: file path (str/Path) OR a dict with:
            - 'connection_string' (required for DB sources)
            - 'query'  (raw SQL to run), or
            - 'table'  (table name to read in full)
        :param kwargs: extra keyword args forwarded to the underlying
            pandas read_* function.
        :return: pandas DataFrame
        """
        if isinstance(source, (str, Path)):
            return DataLoader._load_file(Path(source), **kwargs)
        if isinstance(source, dict):
            return DataLoader._load_database(source, **kwargs)
        raise TypeError(
            "source must be a file path (str/Path) or a dict describing a "
            f"database connection, got {type(source)!r}"
        )

    @staticmethod
    def _load_file(path: Path, **kwargs) -> pd.DataFrame:
        if not path.exists():
            raise FileNotFoundError(f"Source file not found: {path}")

        ext = path.suffix.lower()
        if ext not in DataLoader.SUPPORTED_EXTENSIONS:
            raise ValueError(
                f"Unsupported file type '{ext}'. Supported: "
                f"{sorted(DataLoader.SUPPORTED_EXTENSIONS)}"
            )

        logger.info("Loading file %s (%s)", path, ext)
        if ext == ".csv":
            return pd.read_csv(path, **kwargs)
        if ext in (".xlsx", ".xls"):
            return pd.read_excel(path, **kwargs)
        if ext == ".json":
            return pd.read_json(path, **kwargs)
        raise AssertionError("unreachable")  # pragma: no cover

    @staticmethod
    def _load_database(source: dict, **kwargs) -> pd.DataFrame:
        conn_str = source.get("connection_string")
        if not conn_str:
            raise ValueError("Missing 'connection_string' in source dict")

        try:
            from sqlalchemy import create_engine, text
        except ImportError as exc:
            raise ImportError(
                "Database ingestion requires SQLAlchemy. Install it with "
                "`pip install sqlalchemy` and a matching DB driver "
                "(e.g. psycopg2, pymysql)."
            ) from exc

        engine = create_engine(conn_str)
        query = source.get("query")
        table = source.get("table")

        if query:
            logger.info("Running SQL query against database")
            return pd.read_sql_query(text(query), engine, **kwargs)
        if table:
            logger.info("Reading table '%s' from database", table)
            return pd.read_sql_table(table, engine, **kwargs)

        raise ValueError("Database source dict must provide 'query' or 'table'")
