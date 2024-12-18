"""Scapy routes modules."""

from fastapi import APIRouter, HTTPException
from scapy.config import conf
from scapy.layers.inet import ICMP, IP, TCP
from scapy.layers.l2 import Ether
from scapy.sendrecv import sr1

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
    frame = Ether(dst=dst_mac, src=src_mac, type=int(eth_type, 16))

    return {
        "frame_summary": str(frame.summary()),
        "frame_details": str(frame.show(dump=True)),
    }

@router.get("/tcp-test/{target_ip}/{target_port}", summary="Test a TCP connection")
def get_tcp_test(target_ip:str, target_port:str) -> dict:
    """Test a TCP connection.

    Args:
        target_ip (str): Target IP.
        target_port (str): Target port.

    Returns:
        dict: Result of the TCP test.

    """
    if not isinstance(target_port, int) or not 1 <= target_port <= 65535:  # noqa: PLR2004
        return {"error":\
            "Le champ 'target_port' doit être un entier entre 1 et 65535."}, 400

    packet = IP(dst=target_ip) / TCP(dport=target_port, flags="S")  # Paquet SYN
    response = sr1(packet, timeout=2, verbose=0)

    if response and response.haslayer(TCP):
        tcp_flags = response.getlayer(TCP).flags
        if tcp_flags == "SA":
            return {
                "message": f"Connexion TCP réussie avec \
                    {target_ip}:{target_port} (SYN-ACK reçu).",
                "details": response.show(dump=True),
            }
        if tcp_flags == "RA":
            return {
                "message": f"Connexion TCP refusée par \
                    {target_ip}:{target_port} (RESET reçu).",
            }

        return {
            "message": f"Connexion TCP refusée par \
                {target_ip}:{target_port} (Flags : {tcp_flags}).",
        }

    return {
        "message": "Pas de réponse de la cible.",
    }

@router.get("/ping/{ip}", summary="Ping a target IP")
def get_ping(ip: str) -> dict:
    """Ping a target IP.

    Args:
        ip (str): Target IP address.

    Returns:
        dict: Result of the ping.

    """
    packet = IP(dst=ip) / ICMP()
    response = sr1(packet, timeout=3, verbose=0)

    if response:
        return {
            "message": f"Ping réussi : {response.summary()}",
            "details": response.show(dump=True),
        }

    return {
        "message": "Pas de réponse de la cible.",
    }

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

@router.get("/interface/{ip}", summary="Ping a target IP")
def get_interface(ip: str) -> dict | None:
    """Ping a target IP.

    Args:
        ip (str): Target IP address.

    Returns:
        dict: Result of the ping with detailed information.

    """
    try:
        packet = IP(dst=ip) / ICMP()
        response = sr1(packet, timeout=3, verbose=0)

        if response:
            return {
                "interface": serialize_network_interface(conf.iface),
                "source_ip": packet.src,
                "destination_ip": packet.dst,
            }

        return {
            "message": f"No response from {ip}",
            "interface": serialize_network_interface(conf.iface),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
