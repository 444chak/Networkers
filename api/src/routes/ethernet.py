from flask import Flask, request, jsonify
from scapy.all import Ether

app = Flask(__name__)

@app.route("/api/create_ethernet_frame", methods=["POST"])
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
            return jsonify({"error": "Tous les champs (dst_mac, src_mac, eth_type) sont obligatoires."}), 400

        frame = Ether(dst=dst_mac, src=src_mac, type=int(eth_type, 16))
        
        return jsonify({
            "success": True,
            "frame_summary": str(frame.summary()),
            "frame_details": str(frame.show(dump=True))
        })

    except ValueError as e:
        return jsonify({"error": f"Type Ethernet invalide : {e}"}), 400
    except Exception as e:
        return jsonify({"error": f"Une erreur est survenue : {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
