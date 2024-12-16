"""User model module."""
from pydantic import BaseModel


class User(BaseModel):
    """Class of user model."""

    username:str
    password:str
    role:str
