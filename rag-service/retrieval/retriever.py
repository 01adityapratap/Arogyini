"""
retriever.py
Document Retrieval & Context Formulation Module for AROGYINI RAG Pipeline.
"""
from typing import List, Dict, Any
from ..embeddings.vector_store import VectorStore

class RAGRetriever:
    def __init__(self, vector_store: VectorStore):
        self.vector_store = vector_store

    def retrieve(self, query: str, pillar: str = "general", top_k: int = 3) -> List[Dict[str, Any]]:
        """
        Retrieves relevant context chunks and attaches citation metadata.
        """
        results = self.vector_store.search_similar(query=query, pillar=pillar, top_k=top_k)
        return results

    def format_context(self, chunks: List[Dict[str, Any]]) -> str:
        """Format retrieved chunks into a standardized context block for LLM prompt."""
        formatted = []
        for i, chunk in enumerate(chunks, 1):
            title = chunk.get("title", "Document")
            source = chunk.get("source", "Arogyini Knowledge Base")
            snippet = chunk.get("snippet", "")
            formatted.append(f"[{i}] {title} (Source: {source})\n{snippet}")
        return "\n\n".join(formatted)
