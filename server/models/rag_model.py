import os
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings

VECTOR_DIR = "vectorstore"

def load_vectorstore():
    try:
        embeddings = OpenAIEmbeddings()

        vectorstore = FAISS.load_local(
            VECTOR_DIR,
            embeddings,
            allow_dangerous_deserialization=True
        )

        return vectorstore

    except Exception as e:
        print("RAG MODEL LOAD ERROR:", e)
        return None
