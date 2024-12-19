"""Module for Scapy utilities."""

from scapy.all import ICMP, IP, TCP, Ether, conf, hexdump, sr1


def ping(ipv4: str) -> tuple[IP, IP]:
    """Ping an IPv4 address.

    Args:
        ipv4 (str): The IPv4 address to ping.

    Returns:
        str: Result of the ping.

    """
    packet = IP(dst=ipv4) / ICMP()
    response = sr1(packet, timeout=3, verbose=0)
    return packet, response

def ethernet_frame(dst_mac:str, src_mac:str, eth_type:str) -> hexdump:
    """Create an Ethernet frame.

    Args:
        dst_mac (str): Destination MAC address.
        src_mac (str): Source MAC address.
        eth_type (str): Ethernet type.

    Returns:
        hexdump: Ethernet frame in hexa.

    """
    frame = Ether(dst=dst_mac, src=src_mac, type=int(eth_type, 16))
    return hexdump(frame, dump=True)

def interface(ipv4: str) -> tuple[object, IP, IP]:
    """Get the network interface of an IPv4 address.

    Args:
        ipv4 (str): The IPv4 address.

    Returns:
        tuple: Network interface and IP object.

    """
    iface = conf.iface
    packet, response = ping(ipv4)
    return iface, response, packet

def tcp(target_ip:str, target_port:int) -> tuple[int, IP | None, IP | None, str | None]:
    """Test a TCP connection.

    Args:
        target_ip (str): Target IP.
        target_port (str): Target port.

    Returns:
        tuple: Status of the TCP test.

    """
    packet = IP(dst=target_ip) / TCP(dport=target_port, flags="S")  # Paquet SYN
    response = sr1(packet, timeout=2, verbose=0)

    if response and response.haslayer(TCP):
        tcp_flags = response.getlayer(TCP).flags
        if tcp_flags == "SA":
            return 0, response, packet, tcp_flags
        if tcp_flags == "RA":
            return 1, None, None, tcp_flags

        return 2, None, None, tcp_flags
    return -1, None, None, None
