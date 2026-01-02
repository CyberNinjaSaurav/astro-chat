import os
from openai import OpenAI
from models.chat_model import save_message, get_recent_messages

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
You are AstroChat AI.
You are a helpful personal assistant and content creator.
Be concise, creative, and context-aware.
"""

def stream_chat_with_memory(user_email, user_message):
    try:
        save_message(user_email, "user", user_message)

        history = get_recent_messages(user_email)

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in history:
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            stream=True
        )

        full_reply = ""

        for chunk in response:
            delta = chunk.choices[0].delta
            if delta and delta.content:
                token = delta.content
                full_reply += token
                yield token

        save_message(user_email, "assistant", full_reply)

    except Exception as e:
        print("Chat Service ERROR:", e)
        yield "\n[AI Error]"
