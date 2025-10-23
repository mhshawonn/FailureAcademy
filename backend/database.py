"""
Database configuration and helpers.
"""

from __future__ import annotations

from typing import Generator

from sqlmodel import Session, SQLModel, create_engine

from backend.core.config import settings


def _sqlite_connect_args() -> dict:
    if settings.database_url.startswith("sqlite"):
        return {"check_same_thread": False}
    return {}


engine = create_engine(
    settings.database_url,
    echo=False,
    connect_args=_sqlite_connect_args(),
)


def init_db() -> None:
    """Create database tables."""
    SQLModel.metadata.create_all(bind=engine)


def get_session() -> Generator[Session, None, None]:
    """Yield a SQLModel session for dependency injection."""
    with Session(engine) as session:
        yield session

