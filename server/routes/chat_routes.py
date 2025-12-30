from flask import Blueprint, request, jsonify


chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["POST"])
def chat():
    data = request.json
    return jsonify({
        "reply": "AI response will come here",
        "input": data
    })
