"""Users routes module."""

from fastapi import APIRouter, HTTPException

from models import db
from models.auth import Auth, RefreshToken
from models.user import User, user_table
from utils.auth import (
    create_access_token,
    create_refresh_token,
    get_hashed_password,
    verify_password,
)

router = APIRouter()

@router.post("/login", summary="Login to the app")
async def login(auth: Auth) -> dict:
    """Login to the app with username and password."""
    user: User = None
    stmt = user_table.select().where(user_table.c.username == auth.username)
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchall()

    if len(result) == 0 or len(result[0]) == 0:
        raise HTTPException(status_code=404, detail="User not found")

    user = User.from_db(result[0][0], result[0][1], result[0][2])

    if not verify_password(auth.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    access_token = create_access_token(user.username)
    refresh_token = create_refresh_token(user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/refresh", summary="Refresh the access token")
async def refresh(refresh_token: RefreshToken) -> dict:
    """Refresh the access token."""
    return {"access_token": create_access_token(refresh_token)}

@router.post("/register", summary="Register to the app")
async def register(auth: Auth) -> dict:
    """Register to the app with username and password."""
    user = User(auth.username, get_hashed_password(auth.password), "user")

    stmt = user_table.insert().values(
        username=user.username,
        password=user.password,
    )
    with db.engine.begin() as conn:
        conn.execute(stmt)

    access_token = create_access_token(user.username)
    refresh_token = create_refresh_token(user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}
