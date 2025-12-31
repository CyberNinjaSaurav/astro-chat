from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.auth_routes import auth_bp
from routes.chat_routes import chat_bp

load_dotenv()


app = Flask(__name__)
CORS(app)

    # register routes
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(chat_bp, url_prefix="/chat")


if __name__ == "__main__":
    app.run(debug=True)
