"""
Placeholder chatbot logic for demo interactions.
"""

from __future__ import annotations

from typing import List

PREBAKED_REPLIES = [
    "Great question! Our mentors will share a detailed breakdown soon.",
    "Meanwhile, explore the Beginner's Roadmap in the Courses section.",
    "If this is urgent, drop the question in the Telegram community!",
]


def build_chatbot_reply(message: str) -> tuple[str, List[str]]:
    """Return a simple mirrored response with helpful suggestions."""
    lowered = message.lower()
    if "exam" in lowered:
        reply = "Exams can be intimidating, but consistent practice wins. Try the demo exam to warm up!"
        suggestions = ["Open Demo Exam", "View Exam Tips", "Talk to Mentor"]
    elif "course" in lowered or "learn" in lowered:
        reply = "We have curated courses tailored to different journeys. Check the featured courses for quick wins."
        suggestions = ["Show Featured Courses", "Share Learning Paths", "Talk to Admissions"]
    elif "fail" in lowered or "motivate" in lowered:
        reply = "Failure fuels growth. Let's analyze what didn't click and craft your next iteration."
        suggestions = ["Watch Motivation Playlist", "Book Mentor Call", "Read Alumni Stories"]
    else:
        reply = PREBAKED_REPLIES[0]
        suggestions = PREBAKED_REPLIES[1:]

    return reply, suggestions

