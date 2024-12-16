"""User model module."""
from dataclasses import dataclass

from sqlalchemy import (
    Column,
    String,
    Table,
)

from models import db

user_table = Table(
    "user",
    db.metadata,
    Column("username", String(35), primary_key=True),
    Column("password", String(255), nullable=False),
    Column("role", String(10), nullable=False, default="user"),
)


@dataclass
class User:
    """Class of user model."""

    username:str
    password:str
    role:str

    @classmethod
    def from_db(cls, username: str, password: str, role: str|None) -> "User":
        """Create a new instance.

        Args:
            username (str): Username
            password (str): Password
            role (str | None): Role

        Returns:
            User: Object

        """
        return cls(
            username,
            password,
            role if role else "user",
        )
