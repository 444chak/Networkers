"""FastAPI application."""
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root() -> dict:
    """Return all information about the app.

    Returns:
        dict: Information message

    """
    info = {}
    info["title"] = app.title
    info["version"] = "v" + app.version
    info["author"] = "BORGO, IUT Vélizy"
    return info
