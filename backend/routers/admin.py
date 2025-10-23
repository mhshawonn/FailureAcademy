"""
Admin-only routes for managing demo content.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlmodel import Session

from backend.core.dependencies import require_roles
from backend.database import get_session
from backend.models import Course
from backend.schemas import CourseCreate, CourseRead
from backend.seed import seed_all


router = APIRouter(prefix="/api/admin", tags=["admin"], dependencies=[Depends(require_roles("admin"))])


@router.post("/courses", response_model=CourseRead)
def create_course(
    payload: CourseCreate,
    session: Session = Depends(get_session),
) -> CourseRead:
    """Create a new demo course entry."""
    course = Course(
        title=payload.title,
        description=payload.description,
        price=payload.price,
        level=payload.level,
        thumbnail=payload.thumbnail,
        duration_weeks=payload.duration_weeks,
        is_featured=payload.is_featured,
    )
    session.add(course)
    session.commit()
    session.refresh(course)
    return CourseRead.model_validate(course)


@router.post("/seed")
def rerun_seed(session: Session = Depends(get_session)) -> dict:
    """Re-run all seeders to restore the demo baseline."""
    seed_all(session)
    return {"status": "ok", "detail": "Seed data refreshed."}
