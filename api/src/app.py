"""FastAPI application."""

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dependencies.common_key_header import common_key_header
from middlewares import client_auth
from models import db, user
from routes import auth, ipv4, ipv6, scapy, users

app = FastAPI(title="NetWorkers API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["X-Common-Key", "Content-Type", "Authorization"],
    expose_headers=["X-Common-Key"],
)

app.add_middleware(client_auth.ClientAuth)


@app.get("/", summary="Get app version", dependencies=[Depends(common_key_header)])
async def get_info() -> dict:
    """Get the app info."""
    info = {}
    info["title"] = app.title
    info["version"] = "v" + app.version
    info["author"] = "BORGO, IUT Vélizy"
    return info


app.include_router(
    auth.router,
    prefix="/auth",
    tags=["auth"],
    dependencies=[Depends(common_key_header)],
)
app.include_router(
    users.router,
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(common_key_header)],
)
app.include_router(
    ipv6.router,
    prefix="/ipv6",
    tags=["ipv6"],
    dependencies=[Depends(common_key_header)],
)
app.include_router(
    scapy.router,
    prefix="/scapy",
    tags=["scapy"],
    dependencies=[Depends(common_key_header)],
)
app.include_router(
    ipv4.router,
    prefix="/ipv4",
    tags=["ipv4"],
    dependencies=[Depends(common_key_header)],
)
db.init_db()
user.create_admin_user()
