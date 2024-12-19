"""Users routes module."""

from fastapi import APIRouter, Depends, HTTPException

from dependencies.jwt import jwt_bearer
from models import db
from models.user import User, UserPasswordUpdate, UserUpdate, user_table
from utils.auth import get_hashed_password, verify_password

router = APIRouter()

@router.get("/", response_model=list[User],
            summary="Get all users", dependencies=[Depends(jwt_bearer)])
async def get_all_users(token: dict = Depends(jwt_bearer)) -> dict:  # noqa: B008, FAST002
    """Get all users."""
    # Check if user is admin
    stmt = user_table.select().where(user_table.c.username == token["sub"])
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

@router.get("/me", response_model=User, summary="Get current user",
            dependencies=[Depends(jwt_bearer)])
async def get_current_user(token: dict = Depends(jwt_bearer)) -> dict: # noqa: B008, FAST002
    """Get current user."""
    stmt = user_table.select().where(user_table.c.username == token["sub"])
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    return User.from_db(result[0], result[1], result[2])

@router.get("/{username}", response_model=User,
            summary="Get user by username", dependencies=[Depends(jwt_bearer)])
async def get_user_by_name(username: str, token: dict = Depends(jwt_bearer)) -> dict:\
    # noqa: B008, FAST002
    """Get user by username."""
    # Check if user is admin
    stmt = user_table.select().where(user_table.c.username == token["sub"])
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

@router.patch("/me", response_model=User, summary="Update current user",
              dependencies=[Depends(jwt_bearer)])
async def update_current_user(user_udpate: UserUpdate,\
        token: dict = Depends(jwt_bearer)) -> dict: # noqa: B008, FAST002
    """Update current user."""
    stmt = user_table.select().where(user_table.c.username == token["sub"])
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    user: User = User.from_db(result[0], result[1], result[2])

    if user.username != user_udpate.username:
        stmt = user_table.select().where(user_table.c.username == user_udpate.username)
        with db.engine.begin() as conn:
            result = conn.execute(stmt).fetchone()
        if result:
            raise HTTPException(status_code=400, detail="Username already used")

        user.username = user_udpate.username

    stmt = user_table.update().where(user_table.c.username == token["sub"])\
        .values(user.to_dict())
    with db.engine.begin() as conn:
        conn.execute(stmt)

    return user

@router.patch("/me/password", summary="Update current user password",
              dependencies=[Depends(jwt_bearer)])
async def update_current_user_password(user_password_update: UserPasswordUpdate,\
        token: dict = Depends(jwt_bearer)) -> dict: # noqa: B008, FAST002
    """Update current user password."""
    stmt = user_table.select().where(user_table.c.username == token["sub"])
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    user: User = User.from_db(result[0], result[1], result[2])

    if not verify_password(user_password_update.old_password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    if user_password_update.password != user_password_update.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    user.password = get_hashed_password(user_password_update.password)

    stmt = user_table.update().where(user_table.c.username == token["sub"])\
        .values(user.to_dict())
    with db.engine.begin() as conn:
        conn.execute(stmt)

    return {"message": "Password updated"}

@router.patch("/{username}", response_model=User, summary="Update an user by username",
              dependencies=[Depends(jwt_bearer)])
async def update_user(username: str, user_udpate: UserUpdate,\
        token: dict = Depends(jwt_bearer)) -> dict: # noqa: B008, FAST002
    """Update an user by username."""
    stmt = user_table.select().where(user_table.c.username == token["sub"])
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()
    if result[2] != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")

    stmt = user_table.select().where(user_table.c.username == username)
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    user: User = User.from_db(result[0], result[1], result[2])

    if user.username != user_udpate.username:
        stmt = user_table.select().where(user_table.c.username == user_udpate.username)
        with db.engine.begin() as conn:
            result = conn.execute(stmt).fetchone()
        if result:
            raise HTTPException(status_code=400, detail="Username already used")

        user.username = user_udpate.username

    if not verify_password(user_udpate.password, user.password):
        user.password = get_hashed_password(user_udpate.password)

    stmt = user_table.update().where(user_table.c.username == username)\
        .values(user.to_dict())
    with db.engine.begin() as conn:
        conn.execute(stmt)

    return user

@router.patch("/{username}", summary="Delete an user by username",
              dependencies=[Depends(jwt_bearer)])
async def delete_user(username: str, token: dict = Depends(jwt_bearer)) -> dict:\
        # noqa: B008, FAST002
    """Delete an user by username."""
    stmt = user_table.select().where(user_table.c.username == token["sub"])
    with db.engine.begin() as conn:
        result = conn.execute(stmt).fetchone()
    if result[2] != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")

    stmt = user_table.delete().where(user_table.c.username == username)
    with db.engine.begin() as conn:
        conn.execute(stmt)

    return {"message": "User deleted"}
