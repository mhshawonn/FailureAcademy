"""
Telegram integration helpers for forwarding student doubts.
"""

from __future__ import annotations

from typing import Optional, Tuple

import httpx

from backend.core.config import Settings


def _telegram_base_url(token: str) -> str:
    return f"https://api.telegram.org/bot{token}"


async def send_doubt_to_telegram(
    *,
    settings: Settings,
    name: str,
    role: str,
    message: str,
    image_bytes: Optional[bytes] = None,
    image_filename: Optional[str] = None,
) -> Tuple[bool, str]:
    """Forward the doubt details to Telegram if credentials exist."""
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        # Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your environment to enable forwarding.
        return False, "Telegram credentials not configured."

    base_url = _telegram_base_url(settings.telegram_bot_token)

    payload = {
        "chat_id": settings.telegram_chat_id,
        "parse_mode": "Markdown",
        "text": (
            "*New Failure Academy Doubt*\n"
            f"• *Name:* {name}\n"
            f"• *Role:* {role}\n"
            f"• *Message:* {message}"
        ),
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        if image_bytes and image_filename:
            files = {"photo": (image_filename, image_bytes)}
            data = {
                "chat_id": settings.telegram_chat_id,
                "caption": payload["text"],
                "parse_mode": "Markdown",
            }
            response = await client.post(f"{base_url}/sendPhoto", data=data, files=files)
        else:
            response = await client.post(f"{base_url}/sendMessage", data=payload)

        if response.is_success:
            return True, "Doubt forwarded to Telegram."

        detail = response.text
        return False, f"Failed to forward to Telegram: {detail}"


async def fetch_updates(settings: Settings) -> dict:
    """Fetch Telegram updates to help identify chat IDs."""
    if not settings.telegram_bot_token:
        return {"ok": False, "description": "Set TELEGRAM_BOT_TOKEN to use this endpoint.", "result": []}

    base_url = _telegram_base_url(settings.telegram_bot_token)
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(f"{base_url}/getUpdates")
        response.raise_for_status()
        return response.json()
