"""Common Key Header Dependency."""

import os

from fastapi import Header, HTTPException


async def common_key_header(x_common_key: str = Header(...)) -> None:
    """Add Common Key Header in Swagger.

    Args:
        x_common_key (str, optional): Clé AES. Defaults to Header(...).

    Raises:
        HTTPException: _description_

    """
    if x_common_key != os.getenv("COMMON_KEY"):
        raise HTTPException(status_code=403, detail="Invalid X-Common-Key")
