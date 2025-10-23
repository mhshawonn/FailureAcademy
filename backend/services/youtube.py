"""
YouTube API integration helpers with graceful fallbacks.
"""

from __future__ import annotations

from typing import Any, Dict, List

import httpx

from backend.core.config import Settings

FALLBACK_PLAYLISTS: List[Dict[str, Any]] = [
    {
        "playlistId": "sample_playlist_1",
        "title": "Mindset Shifts for Consistent Learning",
        "thumbnail": "https://i.ytimg.com/vi/2OCF9SgEuSE/hqdefault.jpg",
        "itemCount": 8,
    },
    {
        "playlistId": "sample_playlist_2",
        "title": "Failure Academy Success Stories",
        "thumbnail": "https://i.ytimg.com/vi/2OCF9SgEuSE/hqdefault.jpg",
        "itemCount": 5,
    },
]


async def fetch_channel_id(client: httpx.AsyncClient, settings: Settings) -> str | None:
    """Attempt to resolve the channel ID from the configured handle."""
    query = settings.youtube_channel_handle.lstrip("@")
    params = {
        "part": "snippet",
        "q": query,
        "type": "channel",
        "maxResults": 1,
        "key": settings.youtube_api_key,
    }
    response = await client.get(
        "https://www.googleapis.com/youtube/v3/search",
        params=params,
    )
    response.raise_for_status()
    items = response.json().get("items", [])
    if not items:
        return None
    return items[0]["snippet"]["channelId"]


async def fetch_playlists(settings: Settings) -> List[Dict[str, Any]]:
    """Fetch playlists for the configured channel, falling back to static data."""
    if not settings.youtube_api_key:
        return FALLBACK_PLAYLISTS

    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            channel_id = await fetch_channel_id(client, settings)
            if not channel_id:
                return FALLBACK_PLAYLISTS

            params = {
                "part": "snippet,contentDetails",
                "channelId": channel_id,
                "maxResults": 15,
                "key": settings.youtube_api_key,
            }

            response = await client.get(
                "https://www.googleapis.com/youtube/v3/playlists",
                params=params,
            )
            response.raise_for_status()
            items = response.json().get("items", [])
        except httpx.HTTPError:
            return FALLBACK_PLAYLISTS

    playlists: List[Dict[str, Any]] = []
    for item in items:
        snippet = item.get("snippet", {})
        content_details = item.get("contentDetails", {})
        thumbnails = snippet.get("thumbnails", {})
        high_thumb = thumbnails.get("high") or thumbnails.get("medium") or thumbnails.get("default")

        playlists.append(
            {
                "playlistId": item.get("id"),
                "title": snippet.get("title"),
                "thumbnail": high_thumb.get("url") if high_thumb else None,
                "itemCount": content_details.get("itemCount", 0),
            }
        )

    return playlists or FALLBACK_PLAYLISTS

