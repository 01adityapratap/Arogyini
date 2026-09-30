import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import {
  Layers,
  Cpu,
  Database,
  Send,
  CheckCircle2,
  Copy,
  RefreshCw,
  Terminal,
} from "lucide-react";
import { api } from "../services/api.js";
export const RAGInspector = () => {
  const [ragStatus, setRagStatus] = useState(null);
  const [testQuery, setTestQuery] = useState(
    "What are the statutory requirements and timelines for filing a workplace sexual harassment complaint under POSH Act 2013?",
  );
  const [pillar, setPillar] = useState("legal");
  const [loading, setLoading] = useState(false);
  const [ragResult, setRagResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("main");
  const checkStatus = () => {
    api
      .getRAGStatus()
      .then((data) => setRagStatus(data))
      .catch(() => setRagStatus({ status: "embedded_fallback" }));
  };
  useEffect(() => {
    checkStatus();
  }, []);
  const handleTestRAG = async () => {
    setLoading(true);
    try {
      const res = await api.queryRAG({
        question: testQuery,
        pillar,
      });
      setRagResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const samplePythonCode = {
    main: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import time

app = FastAPI(title="Arogyini Custom Python RAG Microservice", version="1.0.0")

class RAGRequest(BaseModel):
    question: str
    pillar: Optional[str] = "general"
    userContext: Optional[dict] = None

@app.get("/health")
def health():
    return {"status": "ok", "service": "Arogyini Python RAG Engine", "version": "1.0.0"}

@app.post("/query")
async def handle_query(req: RAGRequest):
    start_time = time.time()
    
    # 1. User embeddings & vector lookup (e.g. ChromaDB / FAISS)
    # 2. Re-ranking & Context formulation
    # 3. LLM synthesis (Gemini / Llama 3 / Mistral)
    
    return {
        "answer": f"Custom Python RAG synthesis for: {req.question}",
        "confidence": 0.94,
        "pillar": req.pillar,
        "engine": "custom_python_rag",
        "sources": [{"name": "POSH Act 2013 Gazette", "urlOrAct": "Act 14 of 2013", "category": "statutory"}],
        "retrievedChunks": [
            {
                "id": "chunk_1",
                "title": "Section 9 POSH Complaint Procedure",
                "snippet": "Any aggrieved woman may make in writing a complaint of sexual harassment...",
                "relevanceScore": 0.96,
                "source": "Ministry of WCD Gazette"
            }
        ],
        "suggestedFollowUps": ["What is the 90-day ICC timeline?", "How to request interim relief?"],
        "latencyMs": int((time.time() - start_time) * 1000)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`,
    vector: `from typing import List, Dict
# Vector DB store wrapper (e.g., ChromaDB, FAISS, Qdrant)

class VectorStore:
    def __init__(self):
        # Initialize your embedding model (e.g., sentence-transformers/all-MiniLM-L6-v2)
        pass

    def retrieve(self, query: str, pillar: str, top_k: int = 4) -> List[Dict]:
        """
        Retrieves top-k relevant document chunks based on semantic similarity.
        """
        return [
            {
                "id": "doc_posh_sec9",
                "title": "POSH Act Section 9 - Complaint Procedure",
                "snippet": "Written complaint within 3 months to ICC.",
                "relevanceScore": 0.94,
                "source": "Statutory Gazette of India"
            }
        ]`,
    generator: `import google.generativeai as genai
import os

def generate_answer(query: str, retrieved_chunks: list) -> str:
    """
    Synthesizes a helpful, grounded response using retrieved context chunks.
    """
    context_str = "\\n\\n".join([f"[{c['title']}] {c['snippet']}" for c in retrieved_chunks])
    
    prompt = f"""You are the Arogyini AI Women Empowerment Assistant.
Ground your response strictly on the following retrieved sources:
{context_str}

User Question: {query}
Answer:"""
    
    # Run LLM generation
    return "Grounded response crafted from retrieved context."`,
  };
  return _jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
    children: [
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-teal-500/10 border border-white/80",
        children: [
          _jsxs("div", {
            className: "space-y-2 relative z-10",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider text-purple-800 border border-white",
                children: [
                  _jsx(Cpu, { className: "w-3.5 h-3.5 text-purple-600" }),
                  _jsx("span", {
                    children: "Developer RAG Sandbox & Microservice Bridge",
                  }),
                ],
              }),
              _jsx("h1", {
                className:
                  "font-serif text-2xl sm:text-4xl font-bold text-slate-900",
                children: "Pluggable RAG Architecture & Inspector",
              }),
              _jsx("p", {
                className: "text-xs sm:text-sm text-slate-600 max-w-2xl",
                children:
                  "Test vector retrieval chunks, review the microservice request/response contract, and integrate your custom Python ML/RAG model.",
              }),
            ],
          }),
          _jsxs("div", {
            className:
              "p-3.5 bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl text-xs space-y-1.5 shrink-0 shadow-2xs relative z-10",
            children: [
              _jsxs("div", {
                className: "flex items-center justify-between gap-3",
                children: [
                  _jsx("span", {
                    className: "text-slate-600 font-semibold",
                    children: "Microservice Status:",
                  }),
                  _jsx("span", {
                    className: `px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                      ragStatus?.status === "connected"
                        ? "bg-emerald-100/80 text-emerald-800 border border-emerald-200"
                        : "bg-indigo-100/80 text-indigo-800 border border-indigo-200"
                    }`,
                    children:
                      ragStatus?.status === "connected"
                        ? "Custom Python Microservice"
                        : "Embedded Grounded Engine",
                  }),
                ],
              }),
              _jsxs("button", {
                onClick: checkStatus,
                className:
                  "text-[10px] text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer font-bold",
                children: [
                  _jsx(RefreshCw, { className: "w-3 h-3" }),
                  " Refresh Connection Status",
                ],
              }),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xs space-y-6",
        children: [
          _jsxs("div", {
            className:
              "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/60 pb-4",
            children: [
              _jsxs("div", {
                children: [
                  _jsxs("h3", {
                    className:
                      "font-serif text-xl font-bold text-slate-900 flex items-center gap-2",
                    children: [
                      _jsx(Layers, { className: "w-5 h-5 text-indigo-600" }),
                      _jsx("span", {
                        children: "Live Vector Retrieval & Synthesis Testbench",
                      }),
                    ],
                  }),
                  _jsx("p", {
                    className: "text-xs text-slate-500",
                    children:
                      "Submit test queries to inspect retrieved vector embeddings and relevance scores.",
                  }),
                ],
              }),
              _jsx("div", {
                className: "flex items-center gap-2",
                children: _jsxs("select", {
                  value: pillar,
                  onChange: (e) => setPillar(e.target.value),
                  className:
                    "px-3.5 py-1.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-xs font-bold text-slate-800 shadow-2xs",
                  children: [
                    _jsx("option", {
                      value: "legal",
                      children: "Legal Rights Pillar",
                    }),
                    _jsx("option", {
                      value: "health",
                      children: "Healthcare Pillar",
                    }),
                    _jsx("option", {
                      value: "career",
                      children: "Career & Grants Pillar",
                    }),
                    _jsx("option", {
                      value: "safety",
                      children: "Emergency Safety Pillar",
                    }),
                    _jsx("option", {
                      value: "general",
                      children: "General / All",
                    }),
                  ],
                }),
              }),
            ],
          }),
          _jsxs("div", {
            className: "space-y-3",
            children: [
              _jsx("textarea", {
                rows: 2,
                value: testQuery,
                onChange: (e) => setTestQuery(e.target.value),
                className:
                  "w-full p-3.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white text-slate-900 shadow-2xs",
              }),
              _jsx("div", {
                className: "flex justify-end",
                children: _jsxs("button", {
                  onClick: handleTestRAG,
                  disabled: loading,
                  className:
                    "px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-200 cursor-pointer transition-all",
                  children: [
                    loading
                      ? _jsx(RefreshCw, { className: "w-4 h-4 animate-spin" })
                      : _jsx(Send, { className: "w-4 h-4" }),
                    _jsx("span", {
                      children: loading
                        ? "Retrieving Chunks..."
                        : "Execute Vector Search & Synthesis",
                    }),
                  ],
                }),
              }),
            ],
          }),
          ragResult &&
            _jsxs("div", {
              className:
                "mt-6 p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl border border-white/80 space-y-6 shadow-2xs",
              children: [
                _jsxs("div", {
                  className:
                    "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/60 pb-3 text-xs",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        _jsx("span", {
                          className: "font-bold text-slate-900",
                          children: "RAG Engine:",
                        }),
                        _jsx("span", {
                          className:
                            "bg-indigo-100/80 text-indigo-800 font-mono font-bold px-2.5 py-0.5 rounded-full border border-indigo-200/50",
                          children: ragResult.engine,
                        }),
                        _jsxs("span", {
                          className:
                            "bg-emerald-100/80 text-emerald-800 font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/50",
                          children: [
                            "Confidence: ",
                            (ragResult.confidence * 100).toFixed(0),
                            "%",
                          ],
                        }),
                      ],
                    }),
                    _jsxs("span", {
                      className: "font-mono text-slate-500",
                      children: ["Latency: ", ragResult.latencyMs, "ms"],
                    }),
                  ],
                }),
                _jsxs("div", {
                  className:
                    "bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white space-y-2 shadow-2xs",
                  children: [
                    _jsx("span", {
                      className:
                        "text-[11px] font-bold text-indigo-700 uppercase",
                      children: "Synthesized Response",
                    }),
                    _jsx("p", {
                      className:
                        "text-xs text-slate-800 leading-relaxed whitespace-pre-wrap",
                      children: ragResult.answer,
                    }),
                  ],
                }),
                _jsxs("div", {
                  className: "space-y-3",
                  children: [
                    _jsxs("span", {
                      className:
                        "text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5",
                      children: [
                        _jsx(Database, {
                          className: "w-4 h-4 text-purple-600",
                        }),
                        "Retrieved Vector Chunks (",
                        ragResult.retrievedChunks.length,
                        ")",
                      ],
                    }),
                    _jsx("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                      children: ragResult.retrievedChunks.map((chunk, idx) =>
                        _jsxs(
                          "div",
                          {
                            className:
                              "bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-white/80 space-y-1.5 shadow-2xs",
                            children: [
                              _jsxs("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  _jsx("span", {
                                    className:
                                      "font-bold text-xs text-slate-900 truncate max-w-[220px]",
                                    children: chunk.title,
                                  }),
                                  _jsxs("span", {
                                    className:
                                      "bg-purple-100/80 text-purple-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border border-purple-200/50",
                                    children: ["Score: ", chunk.relevanceScore],
                                  }),
                                ],
                              }),
                              _jsx("p", {
                                className:
                                  "text-slate-600 text-[11px] leading-relaxed",
                                children: chunk.snippet,
                              }),
                              _jsxs("span", {
                                className:
                                  "text-[9.5px] text-slate-500 block font-medium",
                                children: ["Source: ", chunk.source],
                              }),
                            ],
                          },
                          chunk.id || idx,
                        ),
                      ),
                    }),
                  ],
                }),
              ],
            }),
        ],
      }),
      _jsxs("div", {
        className:
          "glass-dark text-white rounded-3xl p-6 sm:p-8 border border-slate-700/60 space-y-6 shadow-xl",
        children: [
          _jsxs("div", {
            className:
              "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4",
            children: [
              _jsxs("div", {
                className: "space-y-1",
                children: [
                  _jsxs("div", {
                    className:
                      "flex items-center gap-2 text-amber-300 text-xs font-bold uppercase",
                    children: [
                      _jsx(Terminal, { className: "w-4 h-4" }),
                      _jsx("span", {
                        children: "Python Microservice Starter Scaffolding",
                      }),
                    ],
                  }),
                  _jsxs("h3", {
                    className: "font-serif text-xl font-bold text-white",
                    children: [
                      "Drop Your Custom RAG Model into ",
                      _jsx("code", {
                        className: "text-amber-300 font-mono",
                        children: "rag-service/",
                      }),
                    ],
                  }),
                ],
              }),
              _jsx("div", {
                className:
                  "flex gap-1.5 bg-slate-800/80 p-1 rounded-full border border-slate-700/60",
                children: ["main", "vector", "generator"].map((tab) =>
                  _jsxs(
                    "button",
                    {
                      onClick: () => setActiveCodeTab(tab),
                      className: `px-3.5 py-1 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${activeCodeTab === tab ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`,
                      children: [tab, ".py"],
                    },
                    tab,
                  ),
                ),
              }),
            ],
          }),
          _jsxs("div", {
            className: "relative",
            children: [
              _jsx("pre", {
                className:
                  "p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800 max-h-96 leading-relaxed",
                children: samplePythonCode[activeCodeTab],
              }),
              _jsxs("button", {
                onClick: () => {
                  navigator.clipboard.writeText(
                    samplePythonCode[activeCodeTab],
                  );
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                },
                className:
                  "absolute top-3 right-3 px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm border border-slate-700",
                children: [
                  copiedCode
                    ? _jsx(CheckCircle2, {
                        className: "w-3.5 h-3.5 text-emerald-400",
                      })
                    : _jsx(Copy, { className: "w-3.5 h-3.5" }),
                  _jsx("span", {
                    children: copiedCode ? "Copied" : "Copy Code",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
