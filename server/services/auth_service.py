import bcrypt
import jwt
import os

from google.oauth2 import id_token
from google.auth.transport import requests

from config import JWT_SECRET
from models.user_model import create_user, find_user_by_email

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


def signup_user(email: str, password: str):
    if find_user_by_email(email):
        return None, "User already exists"

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    create_user(
        email=email,
        password=hashed_password,
        provider="local"
    )

    token = jwt.encode(
        {"email": email},
        JWT_SECRET,
        algorithm="HS256"
    )

    return token, None


def login_user(email: str, password: str):
    user = find_user_by_email(email)

    if not user or user.get("provider") != "local":
        return None, "Invalid credentials"

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):
        return None, "Invalid credentials"

    token = jwt.encode(
        {"email": email},
        JWT_SECRET,
        algorithm="HS256"
    )

    return token, None



def google_auth(token_id: str):
    try:
        idinfo = id_token.verify_oauth2_token(
            token_id,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = idinfo["email"]

        user = find_user_by_email(email)
        if not user:
            create_user(
                email=email,
                password=None,
                provider="google"
            )

        token = jwt.encode(
            {"email": email},
            JWT_SECRET,
            algorithm="HS256"
        )

        return token, None

    except Exception as e:
        print("Google OAuth Error:", e)
        return None, "Google authentication failed"
