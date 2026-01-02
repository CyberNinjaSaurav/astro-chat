from flask import Blueprint, request, Response, jsonify
from services.chat_service import stream_chat_with_memory
from utils.jwt_utils import get_current_user

chat_bp = Blueprint("chat", __name__, url_prefix="/chat")

@chat_bp.route("/stream", methods=["POST", "OPTIONS"])
def chat_stream():
    if request.method == "OPTIONS":
        return "", 200

    try:
        user = get_current_user(request)
        if not user:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"error": "Message required"}), 400

        def generate():
            for token in stream_chat_with_memory(
                user_email=user["email"],
                user_message=data["message"]
            ):
                yield token

        return Response(generate(), mimetype="text/plain")

    except Exception as e:
        print("CHAT STREAM ERROR:", e)
        return jsonify({"error": "Internal server error"}), 500
