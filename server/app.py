from flask import Flask
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.chat_routes import chat_bp

app = Flask(__name__)

# ✅ CORS – allow frontend
CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True
)

# ✅ REGISTER BLUEPRINTS (THIS WAS MISSING / WRONG)
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(chat_bp, url_prefix="/chat")

if __name__ == "__main__":
    app.run(debug=True)
