"""
Database seeding helpers to populate demo data.
"""

from __future__ import annotations

from typing import List

from sqlmodel import Session, select

from backend.core.security import get_password_hash
from backend.models import Course, Exam, ExamQuestion, User


def seed_admin(session: Session) -> None:
    """Ensure a default admin user exists for demo logins."""
    admin_email = "admin@failureacademy.com"
    existing = session.exec(select(User).where(User.email == admin_email)).first()
    if existing:
        return

    admin_user = User(
        name="Failure Admin",
        email=admin_email,
        role="admin",
        hashed_password=get_password_hash("Admin@123"),
    )
    session.add(admin_user)
    session.commit()


def seed_courses(session: Session) -> None:
    """Insert a small catalogue of demo courses if empty."""
    courses = session.exec(select(Course)).all()
    if courses:
        return

    demo_courses: List[Course] = [
        Course(
            title="Restart Blueprint: Turning Setbacks Into Momentum",
            description="A four-week guided sprint to reframe failure, rebuild routines, and relaunch your learning journey.",
            price=49.0,
            level="Beginner",
            thumbnail="https://images.unsplash.com/photo-1584697964154-3ed21ab60b47",
            duration_weeks=4,
            is_featured=True,
        ),
        Course(
            title="Accountability Pods for Ambitious Learners",
            description="Join a micro-community led by a Failure Academy coach to build accountability habits.",
            price=79.0,
            level="Intermediate",
            thumbnail="https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            duration_weeks=6,
            is_featured=True,
        ),
        Course(
            title="Storytelling Your Comeback",
            description="Craft a compelling personal narrative that attracts mentors, investors, and collaborators.",
            price=59.0,
            level="Advanced",
            thumbnail="https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
            duration_weeks=5,
            is_featured=False,
        ),
    ]

    session.add_all(demo_courses)
    session.commit()


def seed_exams(session: Session) -> None:
    """Insert a single demo exam with multiple choice questions."""
    existing = session.exec(select(Exam)).first()
    if existing:
        return

    exam = Exam(
        title="Resilience Foundations Quiz",
        description="Five quick questions to diagnose your bounce-back muscle.",
    )
    session.add(exam)
    session.commit()
    session.refresh(exam)

    questions = [
        ExamQuestion(
            exam_id=exam.id,
            prompt="When a project fails, what is your FIRST instinct?",
            options=[
                "Pause to reflect on what the data says",
                "Blame external circumstances",
                "Switch to a brand new idea immediately",
                "Give up for a few months",
            ],
            correct_option_index=0,
        ),
        ExamQuestion(
            exam_id=exam.id,
            prompt="How do you track your learning experiments?",
            options=[
                "Documented retros every week",
                "Occasional sticky notes",
                "I keep it in my head",
                "I don't run experiments yet",
            ],
            correct_option_index=0,
        ),
        ExamQuestion(
            exam_id=exam.id,
            prompt="Who do you speak to when you're stuck?",
            options=[
                "Mentor/accountability partner",
                "Friends who aren't in the same field",
                "I avoid talking about it",
                "I post anonymously online",
            ],
            correct_option_index=0,
        ),
        ExamQuestion(
            exam_id=exam.id,
            prompt="How often do you iterate on your goals?",
            options=[
                "Every sprint (1-2 weeks)",
                "Quarterly",
                "Annually",
                "Only when something breaks",
            ],
            correct_option_index=0,
        ),
        ExamQuestion(
            exam_id=exam.id,
            prompt="What best describes your relationship with failure?",
            options=[
                "Data for my next playbook",
                "Secret I hide from others",
                "Proof I should stop trying",
                "Something set by fate",
            ],
            correct_option_index=0,
        ),
    ]

    session.add_all(questions)
    session.commit()


def seed_all(session: Session) -> None:
    """Run all seeding routines."""
    seed_admin(session)
    seed_courses(session)
    seed_exams(session)

