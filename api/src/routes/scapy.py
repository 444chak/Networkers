"""Scapy routes modules."""

from fastapi import APIRouter
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
def tcp_test(target_ip:str, target_port:str) -> dict:
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
def ping(ip: str) -> dict:
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
