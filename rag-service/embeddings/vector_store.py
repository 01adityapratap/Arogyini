"""
vector_store.py
Pluggable Vector Storage & Embedding Interface for AROGYINI RAG Pipeline.
You can replace this with ChromaDB, FAISS, Pinecone, or Qdrant with zero changes to the rest of the app.
"""
from typing import List, Dict, Any
import os

class VectorStore:
    def __init__(self, collection_name: str = "arogyini_docs"):
        self.collection_name = collection_name
        self.documents: List[Dict[str, Any]] = []
        self._initialize_store()

    def _initialize_store(self):
        """
        Initialize vector store instance.
        PLUG YOUR EMBEDDING MODEL HERE:
        e.g. from sentence_transformers import SentenceTransformer
             self.model = SentenceTransformer('all-MiniLM-L6-v2')
             import chromadb
             self.client = chromadb.PersistentClient(path="./chroma_db")
        """
        print(f"[VectorStore] Initialized collection: {self.collection_name}")

    def add_documents(self, docs: List[Dict[str, Any]]):
        """Index documents with embeddings into vector store."""
        for doc in docs:
            self.documents.append(doc)
        print(f"[VectorStore] Indexed {len(docs)} documents.")

    def search_similar(self, query: str, pillar: str = "general", top_k: int = 3) -> List[Dict[str, Any]]:
        """
        Query vector store for top_k most similar document chunks.
        REPLACE OR CUSTOMIZE WITH YOUR VECTOR SEARCH CODE:
        e.g. results = self.collection.query(query_texts=[query], n_results=top_k)
        """
        query_words = set(query.lower().split())
        scored_docs = []
        
        for doc in self.documents:
            text = (doc.get("title", "") + " " + doc.get("snippet", "") + " " + doc.get("source", "")).lower()
            score = 0.4
            
            # Pillar bonus
            if pillar != "general" and doc.get("category", "").lower() == pillar.lower():
                score += 0.3
                
            # Keyword overlap
            overlap = sum(1 for w in query_words if len(w) > 2 and w in text)
            score += min(0.3, overlap * 0.1)
            
            scored_docs.append({
                **doc,
                "relevance_score": min(0.99, round(score, 2))
            })
            
        scored_docs.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)
        return scored_docs[:top_k]
