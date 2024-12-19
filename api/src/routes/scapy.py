"""Scapy routes modules."""

import time

from fastapi import APIRouter, HTTPException

from utils.scapy import ethernet_frame, get_ip_from_dns, interfaces, ping, tcp

router = APIRouter()

RE_IP = r"^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"

@router.get("/ethernet-frame/{dst_mac}/{src_mac}/{eth_type}",\
    summary="Create an Ethernet frame")
def create_ethernet_frame(dst_mac:str, src_mac:str, eth_type:str) -> dict:
    """Create an Ethernet frame."""
    frame = ethernet_frame(dst_mac, src_mac, eth_type)

    return {
        "frame": frame,
    }

@router.get("/tcp-test/{target_ip}/{target_port}", summary="Test a TCP connection")
def get_tcp_test(target_ip:str, target_port:int) -> dict:
    """Test a TCP connection."""
    if RE_IP.match(target_ip) is None:
        target_ip = get_ip_from_dns(target_ip)
    start_time = time.time()
    status, response, packet, tcp_flags = tcp(target_ip, target_port)
    rtt = (time.time() - start_time) * 1000  # Convert to ms

    if status == -1:
        raise HTTPException(
            status_code=404,
            detail={
                "message": f"No response from {target_ip}:{target_port}",
            },
        )

    if status == 0:
        return {
                "message":\
                f"Connexion TCP réussie avec {target_ip}:{target_port} (SYN-ACK reçu).",
                "details": {
                "rtt_ms": round(rtt, 2),
                "packet_size": len(response),
                "ttl": response.ttl,
                "source": packet.src,
                "destination": packet.dst,
            },
            }

    if status == 1:
        return {
                "message":\
                f"Connexion TCP refusée par {target_ip}:{target_port} (RESET reçu).",
            }

    return {
        "message": \
        f"Connexion TCP refusée par {target_ip}:{target_port} (Flags : {tcp_flags}).",
    }

@router.get("/ping/{ip}", summary="Ping a target IP")
def get_ping(ip: str) -> dict:
    """Ping a target IP."""
    if RE_IP.match(ip) is None:
        ip = get_ip_from_dns(ip)
    try:
        start_time = time.time()
        packet, response = ping(ip)
        rtt = (time.time() - start_time) * 1000  # Convert to ms

        if response:
            return {
                "rtt_ms": round(rtt, 2),
                "packet_size": len(response),
                "ttl": response.ttl,
                "source": packet.src,
                "destination": packet.dst,
            }

        raise HTTPException(
            status_code=404,
            detail={
                "message": f"No response from {ip}",
                "source": packet.src,
                "destination": ip,
            },
        )

    except (OSError, ValueError) as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ping failed: {e!s}",
        ) from e

@router.get("/interfaces", summary="Get the interfaces of the machine")
def get_interface() -> dict | None:
    """Get the network interfaces of the host."""
    try:
        return interfaces()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


