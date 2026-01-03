from flask import Blueprint, request, jsonify
from services.rag_service import rag_query
from utils.jwt_utils import get_current_user

rag_bp = Blueprint("rag", __name__)

@rag_bp.route("/rag/query", methods=["POST", "OPTIONS"])
def query_rag():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    try:
        user = get_current_user(request)
        if not user:
            return jsonify({"error": "Unauthorized"}), 401

        data = request.get_json()
        if not data or "query" not in data:
            return jsonify({"error": "Query is required"}), 400

        answer = rag_query(data["query"])

        return jsonify({"answer": answer}), 200

    except Exception as e:
        print("RAG ROUTE ERROR:", e)
        return jsonify({"error": "Internal server error"}), 500
