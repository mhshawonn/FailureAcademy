"""
SQLModel data models for the Failure Academy backend.
"""

from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from sqlalchemy import Column, String, Text
from sqlalchemy.dialects.sqlite import JSON
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    """Registered platform user with role-based access."""

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column(String(120)))
    email: str = Field(
        sa_column=Column(String(255), unique=True, index=True),
        description="User email, used as login identifier.",
    )
    hashed_password: str = Field(sa_column=Column(String(255)))
    role: str = Field(
        sa_column=Column(String(20)),
        description="One of student, teacher, admin.",
    )
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)


class Course(SQLModel, table=True):
    """Demo course catalogue entries."""

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(sa_column=Column(String(180)))
    description: str = Field(sa_column=Column(Text))
    price: float = Field(default=0.0)
    level: str = Field(default="Beginner", sa_column=Column(String(50)))
    thumbnail: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    duration_weeks: int = Field(default=4)
    is_featured: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)


class Exam(SQLModel, table=True):
    """Demo exams with multiple choice questions."""

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(sa_column=Column(String(180)))
    description: str = Field(sa_column=Column(Text))

    questions: List["ExamQuestion"] = Relationship(
        back_populates="exam",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )


class ExamQuestion(SQLModel, table=True):
    """Multiple choice question linked to an exam."""

    id: Optional[int] = Field(default=None, primary_key=True)
    exam_id: int = Field(foreign_key="exam.id")
    prompt: str = Field(sa_column=Column(Text))
    options: List[str] = Field(
        default_factory=list,
        sa_column=Column(JSON),
        description="Answer options presented to the student.",
    )
    correct_option_index: int = Field(default=0)

    exam: Optional[Exam] = Relationship(back_populates="questions")


class Doubt(SQLModel, table=True):
    """Student doubt fallback storage when Telegram forwarding is unavailable."""

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column(String(120)))
    role: str = Field(sa_column=Column(String(20)))
    message: str = Field(sa_column=Column(Text))
    image_path: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
