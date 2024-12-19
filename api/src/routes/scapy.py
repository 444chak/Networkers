"""Scapy routes modules."""

import time

from fastapi import APIRouter, HTTPException

from utils.scapy import ethernet_frame, interface, ping, tcp

router = APIRouter()

@router.get("/ethernet-frame/{dst_mac}/{src_mac}/{eth_type}",\
    summary="Create an Ethernet frame")
def create_ethernet_frame(dst_mac:str, src_mac:str, eth_type:str) -> dict:
    """Create an Ethernet frame.

    Args:
        dst_mac (str): Destination MAC address.
        src_mac (str): Source MAC address.
        eth_type (str): Ethernet type.

    Returns:
        dict: Ethernet frame details.

    """
    frame = ethernet_frame(dst_mac, src_mac, eth_type)

    return {
        "frame": frame,
    }

@router.get("/tcp-test/{target_ip}/{target_port}", summary="Test a TCP connection")
def get_tcp_test(target_ip:str, target_port:int) -> dict:
    """Test a TCP connection.

    Args:
        target_ip (str): Target IP.
        target_port (str): Target port.

    Returns:
        dict: Result of the TCP test.

    """
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
    """Ping a target IP.

    Args:
        ip (str): Target IP address.

    Returns:
        dict: Result of the ping.

    """
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

@router.get("/interface/{ip}", summary="Ping a target IP")
def get_interface(ip: str) -> dict | None:
    """Ping a target IP.

    Args:
        ip (str): Target IP address.

    Returns:
        dict: Result of the ping with detailed information.

    """
    try:
        iface, response, packet = interface(ip)

        if response:
            return {
                "interface": serialize_network_interface(iface),
                "source_ip": packet.src,
                "destination_ip": packet.dst,
            }

        return {
            "message": f"No response from {ip}",
            "interface": serialize_network_interface(iface),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

def serialize_network_interface(iface: object) -> dict:
    """Convert a network interface object to a dictionary.

    Args:
        iface (object): Network interface object.

    Returns:
        dict: Dictionary representation of the network interface.

    """
    return {
        "name": str(iface.name) if hasattr(iface, "name") else None,
        "ip": str(iface.ip) if hasattr(iface, "ip") else None,
        "mac": str(iface.mac) if hasattr(iface, "mac") else None,
        "mtu": int(iface.mtu) if hasattr(iface, "mtu") else None,
    }
