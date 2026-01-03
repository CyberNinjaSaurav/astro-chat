import os
from openai import OpenAI
from models.rag_model import load_vectorstore

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
You are AstroChat AI.
Answer ONLY using the provided context.
If the answer is not in the context, say clearly that you do not know.
Do not guess or hallucinate.
"""

def rag_query(user_query):
    try:
        vectorstore = load_vectorstore()
        if not vectorstore:
            return "Knowledge base is not available."

        docs = vectorstore.similarity_search(user_query, k=4)

        if not docs:
            return "I do not have information about that."

        context = "\n\n".join([doc.page_content for doc in docs])

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": f"Context:\n{context}\n\nQuestion:\n{user_query}"
                }
            ],
            temperature=0.2
        )

        return response.choices[0].message.content

    except Exception as e:
        print("RAG SERVICE ERROR:", e)
        return "RAG processing failed."
