"""Ping routes module."""

from scapy.all import IP, ICMP, sr1

router = APIRouter()

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
            return jsonify({"error": "Le champ 'target_ip' est obligatoire."}), 400

        packet = IP(dst=target_ip) / ICMP()
        response = sr1(packet, timeout=3, verbose=0)

        if response:
            return jsonify({
                "success": True,
                "message": f"Ping réussi : {response.summary()}",
                "details": response.show(dump=True)
            })
        else:
            return jsonify({
                "success": False,
                "message": "Pas de réponse de la cible."
            })

    except Exception as e:
        return jsonify({"error": f"Une erreur est survenue : {e}"}), 500
