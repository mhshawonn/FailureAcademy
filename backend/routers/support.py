"""
Support-related routes: chatbot demo, doubt submission, and Telegram helpers.
"""

from __future__ import annotations

from pathlib import Path
from typing import Optional
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
    status,
)
from sqlmodel import Session

from backend.core.config import settings
from backend.core.dependencies import require_roles
from backend.database import get_session
from backend.models import Doubt
from backend.schemas import (
    ChatbotRequest,
    ChatbotResponse,
    DoubtSubmissionResponse,
    TelegramUpdateResponse,
)
from backend.services.chatbot import build_chatbot_reply
from backend.services.telegram import fetch_updates, send_doubt_to_telegram


router = APIRouter(prefix="/api", tags=["support"])

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_ROLES = {"student", "teacher", "admin"}


def _store_doubt_locally(
    *,
    session: Session,
    name: str,
    role: str,
    message: str,
    image_bytes: Optional[bytes],
    image_filename: Optional[str],
) -> None:
    file_path: Optional[str] = None
    if image_bytes and image_filename:
        unique_name = f"{uuid4().hex}_{image_filename}"
        destination = UPLOAD_DIR / unique_name
        destination.write_bytes(image_bytes)
        file_path = str(destination)

    doubt = Doubt(
        name=name,
        role=role,
        message=message,
        image_path=file_path,
    )
    session.add(doubt)
    session.commit()


@router.post("/doubt", response_model=DoubtSubmissionResponse)
async def submit_doubt(
    name: str = Form(...),
    role: str = Form(...),
    message: str = Form(...),
    image: Optional[UploadFile] = File(None),
    session: Session = Depends(get_session),
) -> DoubtSubmissionResponse:
    """Collect learner doubts and forward them to Telegram when available."""
    role_lower = role.lower()
    if role_lower not in ALLOWED_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be student, teacher, or admin.",
        )

    image_bytes: Optional[bytes] = None
    image_filename: Optional[str] = None
    if image:
        image_bytes = await image.read()
        image_filename = image.filename

    forwarded, detail = await send_doubt_to_telegram(
        settings=settings,
        name=name,
        role=role_lower,
        message=message,
        image_bytes=image_bytes,
        image_filename=image_filename,
    )

    if not forwarded:
        _store_doubt_locally(
            session=session,
            name=name,
            role=role_lower,
            message=message,
            image_bytes=image_bytes,
            image_filename=image_filename,
        )
        return DoubtSubmissionResponse(
            status="stored",
            detail="Doubt recorded locally — set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to enable forwarding.",
        )

    return DoubtSubmissionResponse(status="forwarded", detail=detail)


@router.post("/chatbot", response_model=ChatbotResponse)
def chatbot_reply(payload: ChatbotRequest) -> ChatbotResponse:
    """Generate a placeholder chatbot response."""
    reply, suggestions = build_chatbot_reply(payload.message)
    return ChatbotResponse(reply=reply, suggestions=suggestions)


@router.get(
    "/telegram/updates",
    response_model=TelegramUpdateResponse,
    dependencies=[Depends(require_roles("admin"))],
)
async def telegram_updates() -> TelegramUpdateResponse:
    """Fetch Telegram updates to help administrators capture chat IDs."""
    updates = await fetch_updates(settings)
    return TelegramUpdateResponse(
        ok=updates.get("ok", False),
        description=updates.get("description"),
        result_count=len(updates.get("result", [])),
        results=updates.get("result", []),
    )
