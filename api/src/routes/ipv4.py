"""Users routes module."""

from fastapi import APIRouter, Depends

import utils.IPV4 as ipv4_utils
from dependencies.jwt import jwt_bearer

router = APIRouter()

@router.get("/ipv4_class/{ipv4}", summary="Determines the class of an IPv4 address.",\
    dependencies=[Depends(jwt_bearer)])
async def get_ipv4_class(ipv4: str) -> dict:
    """Determines the class of an IPv4 address."""
    res = ipv4_utils.ipv4_class(ipv4)
    return {"ipv4": res}

@router.get("/dec_to_bin/{ipv4}", summary="Converts an IPv4 address from decimal notation to binary notation",\
    dependencies=[Depends(jwt_bearer)])
async def get_dec_to_bin(ipv4: str) -> dict:
    """Converts an IPv4 address from decimal notation to binary notation"""
    res = ipv4_utils.dec_to_bin(ipv4)
    return {"ipv4": res}

@router.get("/dec_to_hex/{ipv4}", summary="Converts an IPv4 address from decimal notation to hexadecimal notation",\
    dependencies=[Depends(jwt_bearer)])
async def get_dec_to_hex(ipv4: str) -> dict:
    """Converts an IPv4 address from decimal notation to hexadecimal notation"""
    res = ipv4_utils.dec_to_hex(ipv4)
    return {"ipv4": res}

@router.get("/hex_to_dec/{ipv4}", summary="Converts an IPv4 address from hexadecimal notation to decimal notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_hex_to_dec(ipv4: str) -> dict:
    """Converts an IPv4 address from hexadecimal notation to decimal notation."""
    res = ipv4_utils.hex_to_dec(ipv4)
    return {"ipv4": res}

@router.get("/bin_to_dec/{ipv4}", summary="Converts an IPv4 address from binary notation to decimal notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_bin_to_dec(ipv4: str) -> dict:
    """Converts an IPv4 address from binary notation to decimal notation."""
    res = ipv4_utils.bin_to_dec(ipv4)
    return {"ipv4": res}

@router.get("/bin_to_dec/{ipv4}", summary="Converts an IPv4 address from binary notation to decimal notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_bin_to_dec(ipv4: str) -> dict:
    """Converts an IPv4 address from binary notation to decimal notation."""
    res = ipv4_utils.bin_to_dec(ipv4)
    return {"ipv4": res}

@router.get("/ipv4_to_cidr/{ipv4}", summary="Converts an IPv4 address to CIDR notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_ipv4_to_cidr(ipv4: str, mask: str) -> dict:
    """Converts an IPv4 address to CIDR notation."""
    res = ipv4_utils.ipv4_to_cidr(ipv4,mask)
    return {"ipv4": res}

@router.get("/get_ivp4_mask/{ipv4}", summary="Calculates the subnet mask from an IPv4 address in CIDR notation.",\
    dependencies=[Depends(jwt_bearer)])
async def get_ipv4_mask(ipv4: str) -> dict:
    """Calculates the subnet mask from an IPv4 address in CIDR notation."""
    res = ipv4_utils.get_ipv4_mask(ipv4)
    return {"ipv4": res}

@router.get("/vlsm/{ipv4}", summary="Implements the VLSM (Variable Length Subnet Mask) technique.",\
    dependencies=[Depends(jwt_bearer)])
async def get_vlsm(baseip: str, subnet: str) -> dict:
    """Implements the VLSM (Variable Length Subnet Mask) technique."""
    res = ipv4_utils.vlsm(baseip,subnet)
    return {"ipv4": res}