"""User model module."""
from dataclasses import asdict, dataclass

from pydantic import BaseModel
from sqlalchemy import (
    Column,
    String,
    Table,
)

from models import db
from utils.auth import get_hashed_password

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

    def to_dict(self) -> dict:
        """Return the dictionary representation of the object.

        Returns:
            dict: Dictionary

        """
        return asdict(self)

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


class UserUpdate(BaseModel):
    """Model for user update."""

    username: str

class UserPasswordUpdate(BaseModel):
    """Model for user password update."""

    password: str
    confirm_password: str


def create_admin_user() -> User|None:
    """Create the admin user if not exists.

    Returns:
        User|None: User object

    """
    user = user_table.select().where(user_table.c.username == "admin")
    with db.engine.begin() as conn:
        result = conn.execute(user).fetchone()
    if result:
        return None

    password = get_hashed_password("admin")
    user = User("admin", password, "admin")
    stmt = user_table.insert().values(user.to_dict())
    with db.engine.begin() as conn:
        conn.execute(stmt)

    return user
