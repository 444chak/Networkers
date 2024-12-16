"""Users routes module."""

from fastapi import APIRouter, HTTPException

from models.auth import Auth, RefreshToken
from models.user import User
from utils.auth import (
    create_access_token,
    create_refresh_token,
    get_hashed_password,
    verify_password,
)

router = APIRouter()

@router.post("/login")
async def login(auth: Auth) -> dict:
    """Login to the app with username and password."""
    user = User.get_user(auth.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(auth.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    access_token = create_access_token(user.username)
    refresh_token = create_refresh_token(user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/refresh")
async def refresh(refresh_token: RefreshToken) -> dict:
    """Refresh the access token."""
    return {"access_token": create_access_token(refresh_token)}

@router.post("/register")
async def register(user: User) -> dict:
    """Register to the app with username and password."""
    user.password = get_hashed_password(user.password)
    user.create_user()
    access_token = create_access_token(user.username)
    refresh_token = create_refresh_token(user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}
