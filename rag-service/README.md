# AROGYINI - Python RAG Microservice (Pluggable Architecture)

This folder contains the standalone Python Retrieval-Augmented Generation (RAG) microservice for the AROGYINI platform.

## How to Plug In Your Custom RAG Model

1. **Install Requirements**:
   ```bash
   cd rag-service
   pip install -r requirements.txt
   ```

2. **Customize Your Components**:
   - **Vector Store & Embeddings**: Edit `embeddings/vector_store.py` to insert your preferred embedding model (e.g., `sentence-transformers/all-MiniLM-L6-v2`, `OpenAIEmbeddings`, `HuggingFaceBgeEmbeddings`, or `ChromaDB / FAISS`).
   - **Retrieval**: Edit `retrieval/retriever.py` to customize semantic search thresholds, hybrid BM25 + dense retrieval, or re-ranking.
   - **Generation**: Edit `generation/generator.py` to connect your preferred LLM (e.g., `Llama-3`, `Mistral`, `Gemini`, `Ollama`, or `vLLM`).

3. **Run the FastAPI Server**:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

4. **Connect to AROGYINI Web Platform**:
   Set `RAG_SERVICE_URL="http://localhost:8000"` in your `.env` file (or test it directly in the in-app RAG Inspector). The Node.js Express server automatically forwards all queries to your Python service without any changes needed!
