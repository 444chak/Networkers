"""Client auth middleware module."""
import os

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

COMMON_KEY = os.getenv("COMMON_KEY")

class ClientAuth(BaseHTTPMiddleware):
    """Client auth middleware class."""

    async def dispatch(self, request: Request, call_next: callable) -> Response:
        """Dispatch method."""
        if request.url.path in ["/docs", "/redoc", "/openapi.json"]:
            return await call_next(request)

        common_key = request.headers.get("X-Common-Key")
        if common_key != COMMON_KEY:
            return JSONResponse(status_code=403,
                                content={"detail": "Invalid Common key"})
        return await call_next(request)
