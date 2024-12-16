"""FastAPI application."""
from fastapi import FastAPI

from models import db
from routes import auth

app = FastAPI()

@app.get("/")
async def get_info() -> dict:
    """Get the app info."""
    info = {}
    info["title"] = app.title
    info["version"] = "v" + app.version
    info["author"] = "BORGO, IUT Vélizy"
    return info

app.include_router(auth.router, prefix="/auth")

db.init_db()
