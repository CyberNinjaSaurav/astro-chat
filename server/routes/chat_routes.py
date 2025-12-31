from flask import Blueprint, request, jsonify
from services.chat_service import chat_with_memory
from utils.jwt_utils import get_current_user

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["POST"])
def chat():
    user = get_current_user(request)
    data = request.json

    if not data or "message" not in data:
        return jsonify({"error": "Message required"}), 400
    
    reply = chat_with_memory(
        user_email=user["email"],
        user_message=data["message"]
    )

    return jsonify({"reply": reply})

