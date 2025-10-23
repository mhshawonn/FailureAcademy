"""
Authentication and authorisation routes.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from backend.core.dependencies import get_current_user
from backend.core.security import create_access_token, get_password_hash, verify_password
from backend.database import get_session
from backend.models import User
from backend.schemas import TokenResponse, UserBase, UserCreate, UserLogin


router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse)
def register_user(
    payload: UserCreate,
    session: Session = Depends(get_session),
) -> TokenResponse:
    """Register a new user with role selection."""
    existing = session.exec(select(User).where(User.email == payload.email)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    user = User(
        name=payload.name,
        email=payload.email,
        role=payload.role,
        hashed_password=get_password_hash(payload.password),
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    token = create_access_token(subject=str(user.id), role=user.role)
    return TokenResponse(access_token=token, role=user.role, name=user.name)


@router.post("/login", response_model=TokenResponse)
def login_user(payload: UserLogin, session: Session = Depends(get_session)) -> TokenResponse:
    """Authenticate user and return a JWT."""
    user = session.exec(select(User).where(User.email == payload.email)).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token = create_access_token(subject=str(user.id), role=user.role)
    return TokenResponse(access_token=token, role=user.role, name=user.name)


@router.get("/me", response_model=UserBase)
def read_current_user(user: User = Depends(get_current_user)) -> UserBase:
    """Return details of the currently authenticated user."""
    return user

