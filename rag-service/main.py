"""
main.py
AROGYINI Python RAG Microservice
FastAPI server exposing the unified plug-and-play RAG interface.
Run with: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import time

from embeddings.vector_store import VectorStore
from retrieval.retriever import RAGRetriever
from generation.generator import RAGGenerator

app = FastAPI(
    title="AROGYINI RAG Microservice",
    description="Unified context-aware retrieval-augmented generation API for Women's Healthcare, Legal Rights, and Safety.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Pipeline components
vector_store = VectorStore()
retriever = RAGRetriever(vector_store)
generator = RAGGenerator()

# Seed default documents on startup
DEFAULT_SEED_DOCS = [
    {
        "id": "doc_1",
        "title": "POSH Act 2013 Internal Complaints Committee & Protections",
        "source": "Sexual Harassment of Women at Workplace Act 2013",
        "category": "legal",
        "snippet": "Workplaces with 10+ employees must have an ICC. Complaints must be registered within 3 months, and inquiry resolved in 90 days. Aggrieved women may receive up to 3 months paid leave as interim relief."
    },
    {
        "id": "doc_2",
        "title": "Protection of Women from Domestic Violence Act 2005",
        "source": "PWDVA 2005",
        "category": "legal",
        "snippet": "Secures right to reside in shared household, immediate ex-parte protection orders from Magistrates, maintenance, and emergency helpline access via 181 and 112."
    },
    {
        "id": "doc_3",
        "title": "PCOS Management & Endocrine Protocol",
        "source": "Arogyini Clinical Guidelines",
        "category": "health",
        "snippet": "Lifestyle interventions including low glycemic nutrition, myo-inositol, regular resistance training, and cycle tracking are primary lines of PCOS care."
    }
]
vector_store.add_documents(DEFAULT_SEED_DOCS)

class RAGQueryRequest(BaseModel):
    question: str = Field(..., example="What is the time limit for filing a POSH workplace complaint?")
    pillar: Optional[str] = Field("general", example="legal")
    userContext: Optional[Dict[str, Any]] = None

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AROGYINI RAG Microservice",
        "indexed_documents": len(vector_store.documents)
    }

@app.post("/query")
def query_rag(payload: RAGQueryRequest):
    """
    Unified RAG Endpoint called directly by AROGYINI Express backend (or frontend).
    """
    start_time = time.time()
    try:
        # Step 1: Retrieve context chunks
        chunks = retriever.retrieve(query=payload.question, pillar=payload.pillar or "general", top_k=3)
        context_text = retriever.format_context(chunks)
        
        # Step 2: Generate response using retrieved context
        gen_output = generator.generate(
            query=payload.question,
            pillar=payload.pillar or "general",
            context_text=context_text,
            chunks=chunks
        )
        
        execution_time_ms = int((time.time() - start_time) * 1000)
        
        return {
            "answer": gen_output["answer"],
            "pillar": payload.pillar,
            "confidence": gen_output.get("confidence", 0.92),
            "sources": [{"name": c.get("title", ""), "urlOrAct": c.get("source", ""), "category": c.get("category", "")} for c in chunks],
            "retrieved_chunks": chunks,
            "suggested_followups": gen_output.get("suggested_followups", []),
            "engine": "custom_python_rag",
            "latencyMs": execution_time_ms
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
