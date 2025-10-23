"""
Application configuration and settings management.
"""

from functools import lru_cache
from typing import List, Optional

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Centralised configuration loaded from environment variables or `.env`."""

    app_name: str = "Failure Academy API"
    api_prefix: str = "/api"
    frontend_origin: str = Field(default="http://localhost:5173", alias="FRONTEND_ORIGIN")

    database_url: str = "sqlite:///./failure_academy.db"

    youtube_api_key: Optional[str] = Field(default=None, alias="YOUTUBE_API_KEY")
    # Replace this handle if you connect a different official Failure Academy channel.
    youtube_channel_handle: str = Field(default="@academyfailure", alias="YOUTUBE_CHANNEL_HANDLE")

    telegram_bot_token: Optional[str] = Field(default=None, alias="TELEGRAM_BOT_TOKEN")
    telegram_chat_id: Optional[str] = Field(default=None, alias="TELEGRAM_CHAT_ID")

    jwt_secret_key: Optional[str] = Field(default=None, alias="JWT_SECRET_KEY")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    cors_allow_origins: Optional[List[str]] = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    @property
    def allowed_origins(self) -> List[str]:
        """Return the configured CORS origin list."""
        if self.cors_allow_origins:
            return self.cors_allow_origins
        return [self.frontend_origin]


@lru_cache
def get_settings() -> Settings:
    """Return a cached settings instance."""
    return Settings()


settings = get_settings()
