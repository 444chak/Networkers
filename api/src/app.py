"""FastAPI application."""
from dotenv import load_dotenv
from fastapi import FastAPI

from routes import auth_router

load_dotenv()

app = FastAPI()

@app.get("/")
async def get_info() -> dict:
    """Get the app info."""
    info = {}
    info["title"] = app.title
    info["version"] = "v" + app.version
    info["author"] = "BORGO, IUT Vélizy"
    return info

app.include_router(auth_router, prefix="/auth")
