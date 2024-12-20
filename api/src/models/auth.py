"""User auth module."""

from pydantic import BaseModel


class Auth(BaseModel):
    """Login and register model."""

    username: str
    password: str


class RefreshToken(BaseModel):
    """Refresh token model."""

    refresh_token: str
