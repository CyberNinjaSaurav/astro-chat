from flask import Blueprint, request, jsonify
from services.chat_service import chat_with_memory
from utils.jwt_utils import get_current_user

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["POST", "OPTIONS"])
def chat():
    # CORS preflight
    if request.method == "OPTIONS":
        return jsonify({}), 200

    try:
        user = get_current_user(request)
        if not user:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"error": "Message is required"}), 400

        reply = chat_with_memory(
            user_email=user["email"],
            user_message=data["message"]
        )

        # SAFETY: never return None
        if not reply:
            reply = "⚠️ AI did not return a response"

        return jsonify({"reply": reply}), 200

    except Exception as e:
        print("CHAT ROUTE ERROR:", e)
        return jsonify({"error": "Internal server error"}), 500
