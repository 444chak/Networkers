"""FastAPI application."""
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def read_root() -> dict:
    """Return a simple Hello World message.

    Returns:
        dict: Hello World message

    """
    return {"message": "Hello World!"}
