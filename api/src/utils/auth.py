"""Module for authentication utilities."""

import os
import re
from datetime import UTC, datetime, timedelta

from fastapi import HTTPException
from jose import JWTError, jwt
from passlib.context import CryptContext

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
ALGORITHM = "HS256"
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_KEY")

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    """Return the hashed password.

    Args:
        password (str): password to hash

    Returns:
        str: Hashed password

    """
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    """Return True if the password is correct, False otherwise.

    Args:
        password (str): password to verify
        hashed_pass (str): hashed password reference

    Returns:
        bool: true if the password is correct, false otherwise

    """
    return password_context.verify(password, hashed_pass)


def create_access_token(subject: str, expires_delta: int | None = None) -> str:
    """Return the access token.

    Args:
        subject (str): User to authenticate
        expires_delta (int | None, optional): Expire delta in minutes. Defaults to None.

    Returns:
        str: Access token

    """
    if expires_delta is not None:
        expires_delta = datetime.now(tz=UTC) + expires_delta
    else:
        expires_delta = datetime.now(tz=UTC) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    return jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)


def create_refresh_token(subject: str, expires_delta: int | None = None) -> str:
    """Return the refresh token.

    Args:
        subject (str): User to authenticate
        expires_delta (int | None, optional): Expire delta in minutes. Defaults to None.

    Returns:
        str: Refresh token

    """
    if expires_delta is not None:
        expires_delta = datetime.now(tz=UTC) + expires_delta
    else:
        expires_delta = datetime.now(tz=UTC) + timedelta(
            minutes=REFRESH_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": str(subject)}
    return jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)


def verify_jwt(token: str) -> dict:
    """Verify JWT token.

    Args:
        token (str): JWT token

    Raises:
        HTTPException: Invalid token

    Returns:
        dict: Payload

    """
    try:
        return jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as err:
        raise HTTPException(status_code=403, detail="Invalid token") from err


def validate_password(password: str) -> bool:
    """Return True if the password is valid, False otherwise.

    Args:
        password (str): Password to validate

    Returns:
        bool: True if the password is valid, False otherwise

    """
    if not password or len(password) < 8:
        return False
    return bool(
        re.match(r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$", password)
    )
