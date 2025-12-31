from config import conversations_collection
from datetime import datetime

def save_message(user_email, role, content):
    conversations_collection.insert_one({
        "user": user_email,
        "role": role,
        "content": content,
        "timestamp": datetime.utcnow()
    })

def get_recent_messages(user_email, limit=10):
    messages = list(
        conversations_collection
        .find({"user": user_email})
        .sort("timestamp", -1)
        .limit(limit)
    )
    return messages[::-1]

