import jwt
from flask import request
from config import JWT_SECRET

def get_current_user(req):
    auth_header = req.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise Exception("Unauthorized")
    
    token = auth_header.split(" ")[1]
    payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])

    return payload