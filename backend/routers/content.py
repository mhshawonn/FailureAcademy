"""
Content delivery routes: playlists, courses, exams, and live placeholders.
"""

from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from backend.core.config import settings
from backend.database import get_session
from backend.models import Course, Exam
from backend.schemas import CourseRead, ExamRead, PlaylistItem
from backend.services.youtube import fetch_playlists


router = APIRouter(prefix="/api", tags=["content"])


@router.get("/playlists", response_model=List[PlaylistItem])
async def list_playlists() -> List[PlaylistItem]:
    """Return playlists sourced from YouTube or sample data."""
    playlists = await fetch_playlists(settings)
    return [PlaylistItem.model_validate(item) for item in playlists]


@router.get("/courses", response_model=List[CourseRead])
def list_courses(session: Session = Depends(get_session)) -> List[CourseRead]:
    """Return demo courses stored in the database."""
    courses = session.exec(select(Course).order_by(Course.is_featured.desc())).all()
    return [CourseRead.model_validate(course) for course in courses]


@router.get("/exams", response_model=List[ExamRead])
def list_exams(session: Session = Depends(get_session)) -> List[ExamRead]:
    """Return demo exams with questions."""
    exams = session.exec(select(Exam)).all()

    # Force load of questions before session closes
    for exam in exams:
        _ = exam.questions  # noqa: F841

    return [ExamRead.model_validate(exam) for exam in exams]


@router.get("/live")
async def live_status() -> dict:
    """Return placeholders for live sessions."""
    return {
        "youtube": {
            "isLive": False,
            "streamUrl": None,
            "placeholder": "YouTube Live stream will appear here when active.",
        },
        "facebook": {
            "isLive": False,
            "streamUrl": None,
            "placeholder": "Facebook Live stream will appear here when active.",
        },
    }

