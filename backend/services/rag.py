import chromadb
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
import os

# Initialize ChromaDB
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="meetings")

embeddings_model = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))
llm = ChatOpenAI(model="gpt-4o-mini", openai_api_key=os.getenv("OPENAI_API_KEY"))


def index_meeting(meeting_id: str, filename: str, transcript: str):
    """Store meeting transcript in ChromaDB"""
    # Split transcript into chunks of ~500 chars
    chunks = [transcript[i:i+500] for i in range(0, len(transcript), 500)]

    for i, chunk in enumerate(chunks):
        embedding = embeddings_model.embed_query(chunk)
        collection.upsert(
            ids=[f"{meeting_id}_{i}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[{"meeting_id": meeting_id, "filename": filename}]
        )


def search_meetings(query: str, n_results: int = 5) -> str:
    """Search across all meetings and generate an answer"""
    # Get query embedding
    query_embedding = embeddings_model.embed_query(query)

    # Search in ChromaDB
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )

    if not results["documents"][0]:
        return "לא נמצאו תוצאות רלוונטיות בפגישות."

    # Build context from results
    context_parts = []
    for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
        context_parts.append(f"[{meta['filename']}]: {doc}")
    context = "\n\n".join(context_parts)

    # Ask GPT with context
    messages = [
        SystemMessage(content="""You are a helpful assistant that answers questions 
        based on meeting transcripts. Answer in the same language as the question.
        Base your answer only on the provided context."""),
        HumanMessage(content=f"Context:\n{context}\n\nQuestion: {query}")
    ]

    response = llm.invoke(messages)
    return response.content