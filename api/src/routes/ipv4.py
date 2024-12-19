"""Users routes module."""

from fastapi import APIRouter, Depends

from dependencies.jwt import jwt_bearer
from utils.IPV4 import (
    bin_to_dec,
    dec_to_bin,
    dec_to_hex,
    get_ipv4_mask,
    hex_to_dec,
    ipv4_class,
    ipv4_to_cidr,
    vlsm,
)

router = APIRouter()

@router.get("/class/{ipv4}", summary="Determine the class of an IPv4 address.",\
    dependencies=[Depends(jwt_bearer)])
async def get_ipv4_class(ipv4: str) -> dict:
    """Determine the class of an IPv4 address."""
    res = ipv4_class(ipv4)
    return {"ipv4": res}

@router.get("/dec_to_bin/{ipv4}",\
    summary="Convert an IPv4 address from decimal notation to binary notation",\
    dependencies=[Depends(jwt_bearer)])
async def get_dec_to_bin(ipv4: str) -> dict:
    """Convert an IPv4 address from decimal notation to binary notation."""
    res = dec_to_bin(ipv4)
    return {"ipv4": res}

@router.get("/dec_to_hex/{ipv4}",\
    summary="Convert an IPv4 address from decimal notation to hexadecimal notation",\
    dependencies=[Depends(jwt_bearer)])
async def get_dec_to_hex(ipv4: str) -> dict:
    """Convert an IPv4 address from decimal notation to hexadecimal notation."""
    res = dec_to_hex(ipv4)
    return {"ipv4": res}

@router.get("/hex_to_dec/{ipv4}",\
    summary="Convert an IPv4 address from hexadecimal notation to decimal notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_hex_to_dec(ipv4: str) -> dict:
    """Convert an IPv4 address from hexadecimal notation to decimal notation."""
    res = hex_to_dec(ipv4)
    return {"ipv4": res}

@router.get("/bin_to_dec/{ipv4}",\
    summary="Convert an IPv4 address from binary notation to decimal notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_bin_to_dec(ipv4: str) -> dict:
    """Convert an IPv4 address from binary notation to decimal notation."""
    res = bin_to_dec(ipv4)
    return {"ipv4": res}

@router.get("/cidr/{ipv4}",\
    summary="Convert an IPv4 address to CIDR notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_cidr(ipv4: str, mask: str) -> dict:
    """Convert an IPv4 address to CIDR notation."""
    res = ipv4_to_cidr(ipv4,mask)
    return {"ipv4": res}

@router.get("/mask/{ipv4}",\
    summary="Calculate the subnet mask from an IPv4 address in CIDR notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_mask(ipv4: str) -> dict:
    """Calculate the subnet mask from an IPv4 address in CIDR notation."""
    res = get_ipv4_mask(ipv4)
    return {"ipv4": res}

@router.get("/vlsm/{ipv4}",\
    summary="Implement the VLSM (Variable Length Subnet Mask) technique.",\
    dependencies=[Depends(jwt_bearer)])
async def get_vlsm(baseip: str, subnet: str) -> dict:
    """Implement the VLSM (Variable Length Subnet Mask) technique."""
    res = vlsm(baseip,subnet)
    return {"ipv4": res}
