"""Users routes module."""

from fastapi import APIRouter, Depends, HTTPException

from dependencies.jwt import jwt_bearer
from models import db
from models.user import User, user_table

router = APIRouter()

@router.get("/", response_model=list[User],
            summary="Get all users", dependencies=[Depends(jwt_bearer)])
async def get_all_users(token: dict = Depends(jwt_bearer)) -> dict:  # noqa: B008, FAST002
    """Get all users."""
    # Check if user is admin
    stmt = user_table.select()\
        .where(user_table.c.username == token["sub"])
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()
    if result[2] != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")

    stmt = user_table.select()
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchall()

    if len(result) == 0:
        raise HTTPException(status_code=404, detail="No user found")

    return [User.from_db(row[0], row[1], row[2]) for row in result if len(row) > 0]

@router.get("/{username}", response_model=User,
            summary="Get user by username", dependencies=[Depends(jwt_bearer)])
async def get_user_by_name(username: str, token: dict = Depends(jwt_bearer)) -> dict:\
    # noqa: B008, FAST002
    """Get user by username."""
    # Check if user is admin
    stmt = user_table.select()\
        .where(user_table.c.username == token["sub"])
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()

    if result[2] != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")

    stmt = user_table.select().where(user_table.c.username == username)
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    return User.from_db(result[0], result[1], result[2])
