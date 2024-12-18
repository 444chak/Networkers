"""Ethernet, ping and TCP routes modules"""

from flask import Flask, request, jsonify
from scapy.all import Ether


router = APIRouter()

#######################################
# Route pour créer une trame Ethernet #
#######################################

@router.post("/create_ethernet_frame", summary="Create an Ethernet frame")
def create_ethernet_frame():
    """
    Route pour créer une trame Ethernet.
    Attente un JSON avec les champs : dst_mac, src_mac, eth_type.
    """
    try:
        data = request.json
        dst_mac = data.get("dst_mac")  # Adresse MAC de destination
        src_mac = data.get("src_mac")  # Adresse MAC source
        eth_type = data.get("eth_type")  # Type Ethernet (format hexadécimal, ex: "0x0800")

        if not dst_mac or not src_mac or not eth_type:
            return {"error": "Tous les champs (dst_mac, src_mac, eth_type) sont obligatoires."}, 400

        frame = Ether(dst=dst_mac, src=src_mac, type=int(eth_type, 16))
        
        return {
            "success": True,
            "frame_summary": str(frame.summary()),
            "frame_details": str(frame.show(dump=True))
        }

    except ValueError as e:
        return {"error": f"Type Ethernet invalide : {e}"}, 400
    except Exception as e:
        return {"error": f"Une erreur est survenue : {e}"}, 500


#######################################
# Route pour tester une connexion TCP #
#######################################

@router.post("/tcp_test", summary="Test a TCP connection")
def tcp_test():
    """
    Route pour tester une connexion TCP.
    Attente un JSON avec les champs : target_ip et target_port.
    """
    try:
        data = request.json
        target_ip = data.get("target_ip")
        target_port = data.get("target_port")

        if not target_ip or not target_port:
            return {"error": "Les champs 'target_ip' et 'target_port' sont obligatoires."}, 400

        if not isinstance(target_port, int) or not (1 <= target_port <= 65535):
            return {"error": "Le champ 'target_port' doit être un entier entre 1 et 65535."}, 400

        packet = IP(dst=target_ip) / TCP(dport=target_port, flags="S")  # Paquet SYN
        response = sr1(packet, timeout=2, verbose=0)

        if response and response.haslayer(TCP):
            tcp_flags = response.getlayer(TCP).flags
            if tcp_flags == "SA":
                return {
                    "success": True,
                    "message": f"Connexion TCP réussie avec {target_ip}:{target_port} (SYN-ACK reçu).",
                    "details": response.show(dump=True)
                }
            elif tcp_flags == "RA": 
                return {
                    "success": False,
                    "message": f"Connexion TCP refusée par {target_ip}:{target_port} (RESET reçu)."
                }
        else:
            return {
                "success": False,
                "message": "Pas de réponse de la cible."
            }

    except Exception as e:
        return {"error": f"Une erreur est survenue : {e}"}, 500


#############################
# Route pour tester un PING #
#############################

@router.post("/ping", summary="Ping a target IP")
def ping():
    """
    Route pour effectuer un ping.
    Attente un JSON avec le champ : target_ip.
    """
    try:
        data = request.json
        target_ip = data.get("target_ip")

        if not target_ip:
            return {"error": "Le champ 'target_ip' est obligatoire."}, 400

        packet = IP(dst=target_ip) / ICMP()
        response = sr1(packet, timeout=3, verbose=0)

        if response:
            return jsonify({
                "success": True,
                "message": f"Ping réussi : {response.summary()}",
                "details": response.show(dump=True)
            })
        else:
            return {
                "success": False,
                "message": "Pas de réponse de la cible."
            }

    except Exception as e:
        return {"error": f"Une erreur est survenue : {e}"}, 500