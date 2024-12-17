"""JWT Dependency."""
from fastapi import Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from utils.auth import verify_jwt

security = HTTPBearer()

async def jwt_bearer(credentials: HTTPAuthorizationCredentials = Security(security)) \
        -> dict:  # noqa: B008
    """Verify JWT token.

    Args:
        credentials (HTTPAuthorizationCredentials, optional):
            HTTP authorization credentials. Defaults to None.

    Returns:
        dict: Decoded JWT payload

    Raises:
        HTTPException: If credentials are not provided or token is invalid

    """
    return verify_jwt(credentials.credentials)
