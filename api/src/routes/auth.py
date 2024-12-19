"""Users routes module."""

from fastapi import APIRouter, HTTPException

from models import db
from models.auth import Auth, RefreshToken
from models.user import User, user_table
from utils.auth import (
    create_access_token,
    create_refresh_token,
    get_hashed_password,
    validate_password,
    verify_jwt,
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
    # Verify the refresh token
    token = verify_jwt(refresh_token.refresh_token)
    if not token:
        raise HTTPException(status_code=400, detail="Invalid refresh token")

    # Create a new access token
    access_token = create_access_token(token["sub"])
    return {"access_token": access_token}


@router.post("/register", summary="Register to the app")
async def register(auth: Auth) -> dict:
    """Register to the app with username and password."""
    if auth.password is None or not validate_password(auth.password):
        raise HTTPException(status_code=400, detail="Invalid password")

    user = User(auth.username, get_hashed_password(auth.password), "user")

    stmtverify = user_table.select().where(user_table.c.username == user.username)

    with db.engine.begin() as conn:
        result = conn.execute(stmtverify).fetchall()

    if len(result) > 0:
        raise HTTPException(status_code=400, detail="User already exists")

    stmt = user_table.insert().values(
        username=user.username,
        password=user.password,
    )
    with db.engine.begin() as conn:
        conn.execute(stmt)

    access_token = create_access_token(user.username)
    refresh_token = create_refresh_token(user.username)
    return {"access_token": access_token, "refresh_token": refresh_token}
