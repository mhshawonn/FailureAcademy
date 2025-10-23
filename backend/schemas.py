"""
Pydantic models for request and response payloads.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any, List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field, constr


class UserBase(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: Literal["student", "teacher", "admin"]
    created_at: datetime

    model_config = {"from_attributes": True}


class UserCreate(BaseModel):
    name: constr(min_length=2, max_length=120)
    email: EmailStr
    password: constr(min_length=6, max_length=128)
    role: Literal["student", "teacher", "admin"]


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: Literal["student", "teacher", "admin"]
    name: str


class PlaylistItem(BaseModel):
    playlist_id: str = Field(alias="playlistId")
    title: str
    thumbnail: Optional[str] = None
    item_count: int = Field(alias="itemCount")

    model_config = {"populate_by_name": True}


class CourseRead(BaseModel):
    id: int
    title: str
    description: str
    price: float
    level: str
    thumbnail: Optional[str]
    duration_weeks: int
    is_featured: bool

    model_config = {"from_attributes": True}


class CourseCreate(BaseModel):
    title: constr(min_length=3, max_length=180)
    description: constr(min_length=10)
    price: float = 0.0
    level: str = "Beginner"
    thumbnail: Optional[str] = None
    duration_weeks: int = 4
    is_featured: bool = False


class ExamQuestionRead(BaseModel):
    id: int
    prompt: str
    options: List[str]
    correct_option_index: int = Field(alias="correctOptionIndex")

    model_config = {"from_attributes": True, "populate_by_name": True}


class ExamRead(BaseModel):
    id: int
    title: str
    description: str
    questions: List[ExamQuestionRead]

    model_config = {"from_attributes": True}


class ChatbotRequest(BaseModel):
    message: constr(min_length=1, max_length=1000)


class ChatbotResponse(BaseModel):
    reply: str
    suggestions: Optional[List[str]] = None


class DoubtSubmissionResponse(BaseModel):
    status: str
    detail: str


class TelegramUpdateResponse(BaseModel):
    ok: bool
    description: Optional[str] = None
    result_count: int = 0
    results: List[Any] = Field(default_factory=list)
