import os
from openai import OpenAI
from models.chat_model import save_message, get_recent_messages

client = OpenAI(api_key = os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
You are AstroChat AI.
You are a helpful personal assistant and content creator.
Be concise, creative, and context-aware.
"""

def chat_with_memory(user_email, user_message):

    save_message(user_email, "user", user_message)
    history = get_recent_messages(user_email)

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in history:
        messages.append({
            "role": msg["role"],
            "content": msg["content"]
        })

    response = client.chat.completions.create(
        model ="gpt-4o-mini", 
        messages = messages,
        temperature=0.7
    )

    reply = response.choices[0].message.content

    save_message(user_email, "assistant", reply)

    return reply

