"""Users routes module."""

from fastapi import APIRouter, Depends, HTTPException

from dependencies.jwt import jwt_bearer
from models import db
from models.user import User, user_table

router = APIRouter()

@router.get("/users", response_model=list[User], tags=["users"],
            summary="Get all users", dependencies=[Depends(jwt_bearer)])
async def get_all_users() -> dict:
    """Get all users."""
    stmt = user_table.select()
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchall()

    if len(result) == 0:
        raise HTTPException(status_code=404, detail="No user found")

    return [User.from_db(row[0], row[1], row[2]) for row in result if len(row) > 0]
