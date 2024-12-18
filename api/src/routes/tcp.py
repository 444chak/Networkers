from scapy.all import IP, TCP, sr1

@app.route("/api/tcp_test", methods=["POST"])
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
            return jsonify({"error": "Les champs 'target_ip' et 'target_port' sont obligatoires."}), 400

        if not isinstance(target_port, int) or not (1 <= target_port <= 65535):
            return jsonify({"error": "Le champ 'target_port' doit être un entier entre 1 et 65535."}), 400

        packet = IP(dst=target_ip) / TCP(dport=target_port, flags="S")  # Paquet SYN
        response = sr1(packet, timeout=2, verbose=0)

        if response and response.haslayer(TCP):
            tcp_flags = response.getlayer(TCP).flags
            if tcp_flags == "SA":
                return jsonify({
                    "success": True,
                    "message": f"Connexion TCP réussie avec {target_ip}:{target_port} (SYN-ACK reçu).",
                    "details": response.show(dump=True)
                })
            elif tcp_flags == "RA": 
                return jsonify({
                    "success": False,
                    "message": f"Connexion TCP refusée par {target_ip}:{target_port} (RESET reçu)."
                })
        else:
            return jsonify({
                "success": False,
                "message": "Pas de réponse de la cible."
            })

    except Exception as e:
        return jsonify({"error": f"Une erreur est survenue : {e}"}), 500
