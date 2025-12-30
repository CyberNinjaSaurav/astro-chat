import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")

client = MongoClient(MONGO_URI)

db = client["Fullstack_ai_chatbot"]

users_collection = db["users"]
conversations_collection = db["conversations"]
