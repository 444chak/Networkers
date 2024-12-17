"""Users routes module."""

from fastapi import APIRouter, Depends

import utils.ipv6 as ipv6_utils
from dependencies.jwt import jwt_bearer
from models.ipv6 import Ipv6

router = APIRouter()

@router.get("/simplify/{ipv6}", summary="Get the simplification of the IPV6",\
    dependencies=[Depends(jwt_bearer)])
async def get_simplify(ipv6: str) -> dict:
    """Get simplification of the IPV6."""
    res = ipv6_utils.simplify(ipv6)
    return {"ipv6": res}

@router.get("/extend/{ipv6}", summary="Get the extend of the IPV6",\
    dependencies=[Depends(jwt_bearer)])
async def get_extend(ipv6: str) -> dict:
    """Get extend of the IPV6."""
    res = ipv6_utils.extend(ipv6)
    return {"ipv6": res}
