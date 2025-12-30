from flask import Blueprint, request, jsonify
from services.auth_service import signup_user, login_user, google_auth

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    token, error = signup_user(data["email"], data["password"])

    if error:
        return jsonify({"error": error}), 400

    return jsonify({"token": token})

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    token, error = login_user(data["email"], data["password"])

    if error:
        return jsonify({"error": error}), 401

    return jsonify({"token": token})

@auth_bp.route("/google", methods=["POST"])
def google_login():
    data = request.json
    token, error = google_auth(data["token"])

    if error:
        return jsonify({"error": error}), 401

    return jsonify({"token": token})