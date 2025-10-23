"""
Entrypoint for the Failure Academy FastAPI application.
"""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session

from backend.core.config import settings
from backend.database import engine, init_db
from backend.routers import admin, auth, content, support
from backend.seed import seed_all


def create_application() -> FastAPI:
    """Instantiate the FastAPI app with middleware and routers."""
    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        openapi_url=f"{settings.api_prefix}/openapi.json",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth.router)
    app.include_router(content.router)
    app.include_router(support.router)
    app.include_router(admin.router)

    @app.get("/api/health", tags=["system"])
    def health_check() -> dict:
        """Lightweight health probe."""
        return {"status": "ok"}

    return app


app = create_application()


@app.on_event("startup")
def on_startup() -> None:
    """Initialise database schema and seed demo data."""
    init_db()
    with Session(engine) as session:
        seed_all(session)

