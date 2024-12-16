"""FastAPI application."""
from fastapi import Depends, FastAPI

from dependencies.common_key_header import common_key_header
from middlewares import client_auth
from models import db
from routes import auth, users

app = FastAPI()

@app.get("/", dependencies=[Depends(common_key_header)])
async def get_info() -> dict:
    """Get the app info."""
    info = {}
    info["title"] = app.title
    info["version"] = "v" + app.version
    info["author"] = "BORGO, IUT Vélizy"
    return info

app.add_middleware(client_auth.ClientAuth)

app.include_router(auth.router, prefix="/auth",
                   dependencies=[Depends(common_key_header)])
app.include_router(users.router, prefix="/users",
                   dependencies=[Depends(common_key_header)])

db.init_db()
