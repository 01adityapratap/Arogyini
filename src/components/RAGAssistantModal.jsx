import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Layers,
  FileText,
  ShieldCheck,
  Scale,
  Heart,
  Briefcase,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { api } from "../services/api.js";
export const RAGAssistantModal = ({
  isOpen,
  onClose,
  initialPillar = "general",
}) => {
  const [selectedPillar, setSelectedPillar] = useState(initialPillar);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedChunksMessageId, setExpandedChunksMessageId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: "msg_welcome",
      sender: "assistant",
      text: "Namaste! I am your **Arogyini AI Assistant**, powered by modular Retrieval-Augmented Generation (RAG). Ask me about:\n\n• **Legal Rights**: POSH Act, Domestic Violence Act, Zero FIR & FIR drafting\n• **Health Care**: PCOS management, cycle symptoms, reproductive wellness\n• **Career**: Women returnships, tech grants, government scholarships\n• **Safety**: Emergency protocols, safe transit & national helplines (112, 181)",
      pillar: "general",
      suggestedFollowUps: [
        "How do I file a workplace harassment complaint under POSH?",
        "What are the primary symptoms and diet for PCOS?",
        "What government scholarships are available for female STEM students?",
        "How do I lodge a Zero FIR at any police station?",
      ],
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (initialPillar) setSelectedPillar(initialPillar);
  }, [initialPillar]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  const handleSend = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;
    const userMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: textToSend,
      pillar: selectedPillar,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setLoading(true);
    try {
      const response = await api.queryRAG({
        question: textToSend,
        pillar: selectedPillar,
      });
      const assistantMessage = {
        id: `ast_${Date.now()}`,
        sender: "assistant",
        text: response.answer,
        pillar: response.pillar,
        ragMetadata: {
          confidence: response.confidence,
          sources: response.sources,
          retrievedChunks: response.retrievedChunks,
          engine: response.engine,
          latencyMs: response.latencyMs,
        },
        suggestedFollowUps: response.suggestedFollowUps,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: "assistant",
          text: "I encountered an issue retrieving information from the knowledge base. Please verify your connection or try rephrasing.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;
  const pillars = [
    { id: "general", label: "All Pillars", icon: Sparkles },
    { id: "health", label: "Health", icon: Heart },
    { id: "legal", label: "Legal Rights", icon: Scale },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "safety", label: "Safety", icon: ShieldAlert },
  ];
  return _jsx("div", {
    className:
      "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md",
    children: _jsxs("div", {
      className:
        "glass-dark rounded-[2rem] max-w-2xl w-full h-[90vh] sm:h-[82vh] flex flex-col shadow-2xl border border-slate-700/60 overflow-hidden text-slate-100",
      children: [
        _jsxs("div", {
          className:
            "px-6 py-4 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 flex items-center justify-between shrink-0",
          children: [
            _jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                _jsx("div", {
                  className:
                    "w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400",
                  children: _jsx(Bot, { className: "w-5 h-5" }),
                }),
                _jsxs("div", {
                  children: [
                    _jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        _jsx("h3", {
                          className: "font-serif text-lg font-bold text-white",
                          children: "Arogyini RAG Intelligence",
                        }),
                        _jsx("span", {
                          className:
                            "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold",
                          children: "Active",
                        }),
                      ],
                    }),
                    _jsx("p", {
                      className: "text-xs text-slate-400",
                      children:
                        "Grounded on Statutory Acts, Medical Protocols & Opportunities",
                    }),
                  ],
                }),
              ],
            }),
            _jsx("button", {
              onClick: onClose,
              className:
                "p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer",
              children: _jsx(X, { className: "w-5 h-5" }),
            }),
          ],
        }),
        _jsxs("div", {
          className:
            "px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none",
          children: [
            _jsx("span", {
              className: "text-xs font-semibold text-slate-400 px-1 shrink-0",
              children: "Domain:",
            }),
            pillars.map((p) => {
              const Icon = p.icon;
              const isSel = selectedPillar === p.id;
              return _jsxs(
                "button",
                {
                  onClick: () => setSelectedPillar(p.id),
                  className: `px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    isSel
                      ? "bg-rose-500 text-white shadow-sm shadow-rose-900/50 border border-rose-400/50"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/50"
                  }`,
                  children: [
                    _jsx(Icon, {
                      className: `w-3.5 h-3.5 ${isSel ? "text-white" : "text-slate-400"}`,
                    }),
                    _jsx("span", { children: p.label }),
                  ],
                },
                p.id,
              );
            }),
          ],
        }),
        _jsxs("div", {
          className:
            "flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-950/40",
          children: [
            messages.map((msg) =>
              _jsxs(
                "div",
                {
                  className: `flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`,
                  children: [
                    _jsxs("div", {
                      className: `max-w-[90%] sm:max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-indigo-600 text-white rounded-br-xs shadow-md shadow-indigo-950/40 border border-indigo-500/40"
                          : "bg-slate-800/80 backdrop-blur-md border border-slate-700/70 text-slate-200 rounded-bl-xs shadow-sm"
                      }`,
                      children: [
                        _jsx("div", {
                          className: "whitespace-pre-wrap",
                          children: msg.text,
                        }),
                        msg.ragMetadata &&
                          _jsxs("div", {
                            className:
                              "mt-3 pt-3 border-t border-slate-700/60 text-xs space-y-2",
                            children: [
                              _jsxs("div", {
                                className:
                                  "flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-medium",
                                children: [
                                  _jsxs("span", {
                                    className:
                                      "flex items-center gap-1 text-indigo-300 font-semibold",
                                    children: [
                                      _jsx(ShieldCheck, {
                                        className:
                                          "w-3.5 h-3.5 text-indigo-400",
                                      }),
                                      "Confidence: ",
                                      (
                                        msg.ragMetadata.confidence * 100
                                      ).toFixed(0),
                                      "% \u2022 Engine:",
                                      " ",
                                      msg.ragMetadata.engine ===
                                      "custom_python_rag"
                                        ? "Python RAG"
                                        : msg.ragMetadata.engine ===
                                            "gemini_grounded"
                                          ? "Gemini Grounded"
                                          : "Embedded Retriever",
                                    ],
                                  }),
                                  _jsxs("span", {
                                    className: "font-mono text-slate-400",
                                    children: [msg.ragMetadata.latencyMs, "ms"],
                                  }),
                                ],
                              }),
                              msg.ragMetadata.sources &&
                                msg.ragMetadata.sources.length > 0 &&
                                _jsx("div", {
                                  className: "flex flex-wrap gap-1.5 pt-1",
                                  children: msg.ragMetadata.sources.map(
                                    (src, idx) =>
                                      _jsxs(
                                        "span",
                                        {
                                          className:
                                            "bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1",
                                          children: [
                                            _jsx(FileText, {
                                              className:
                                                "w-3 h-3 text-indigo-400",
                                            }),
                                            _jsx("span", {
                                              className:
                                                "truncate max-w-[200px]",
                                              children: src.name,
                                            }),
                                          ],
                                        },
                                        idx,
                                      ),
                                  ),
                                }),
                              msg.ragMetadata.retrievedChunks &&
                                msg.ragMetadata.retrievedChunks.length > 0 &&
                                _jsxs("div", {
                                  className: "mt-2",
                                  children: [
                                    _jsxs("button", {
                                      onClick: () =>
                                        setExpandedChunksMessageId(
                                          expandedChunksMessageId === msg.id
                                            ? null
                                            : msg.id,
                                        ),
                                      className:
                                        "text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer",
                                      children: [
                                        _jsx(Layers, { className: "w-3 h-3" }),
                                        _jsx("span", {
                                          children:
                                            expandedChunksMessageId === msg.id
                                              ? "Hide Retrieved Vector Chunks"
                                              : `View ${msg.ragMetadata.retrievedChunks.length} Retrieved Vector Chunks`,
                                        }),
                                        expandedChunksMessageId === msg.id
                                          ? _jsx(ChevronUp, {
                                              className: "w-3 h-3",
                                            })
                                          : _jsx(ChevronDown, {
                                              className: "w-3 h-3",
                                            }),
                                      ],
                                    }),
                                    expandedChunksMessageId === msg.id &&
                                      _jsx("div", {
                                        className:
                                          "mt-2 space-y-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-700/60",
                                        children:
                                          msg.ragMetadata.retrievedChunks.map(
                                            (chunk, cIdx) =>
                                              _jsxs(
                                                "div",
                                                {
                                                  className:
                                                    "bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50 text-[11px]",
                                                  children: [
                                                    _jsxs("div", {
                                                      className:
                                                        "flex items-center justify-between font-bold text-slate-200 mb-1",
                                                      children: [
                                                        _jsx("span", {
                                                          className:
                                                            "truncate max-w-[280px]",
                                                          children: chunk.title,
                                                        }),
                                                        _jsxs("span", {
                                                          className:
                                                            "bg-purple-950/80 text-purple-300 border border-purple-800/60 px-1.5 py-0.2 rounded font-mono text-[9px]",
                                                          children: [
                                                            "Score: ",
                                                            chunk.relevanceScore,
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    _jsx("p", {
                                                      className:
                                                        "text-slate-400 text-[10.5px] leading-relaxed",
                                                      children: chunk.snippet,
                                                    }),
                                                    _jsxs("span", {
                                                      className:
                                                        "text-[9.5px] text-slate-500 font-medium mt-1 block",
                                                      children: [
                                                        "Ref: ",
                                                        chunk.source,
                                                      ],
                                                    }),
                                                  ],
                                                },
                                                chunk.id || cIdx,
                                              ),
                                          ),
                                      }),
                                  ],
                                }),
                            ],
                          }),
                      ],
                    }),
                    _jsx("span", {
                      className: "text-[10px] text-slate-500 mt-1 px-2",
                      children: msg.timestamp,
                    }),
                    msg.suggestedFollowUps &&
                      msg.suggestedFollowUps.length > 0 &&
                      _jsx("div", {
                        className: "mt-2 flex flex-wrap gap-1.5 max-w-[90%]",
                        children: msg.suggestedFollowUps.map((chip, cIdx) =>
                          _jsxs(
                            "button",
                            {
                              onClick: () => handleSend(chip),
                              className:
                                "text-[11px] bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 text-slate-300 hover:text-white px-3 py-1 rounded-full text-left transition-all cursor-pointer flex items-center gap-1",
                              children: [
                                _jsx("span", { children: chip }),
                                _jsx(ArrowRight, {
                                  className:
                                    "w-2.5 h-2.5 text-indigo-400 shrink-0",
                                }),
                              ],
                            },
                            cIdx,
                          ),
                        ),
                      }),
                  ],
                },
                msg.id,
              ),
            ),
            loading &&
              _jsxs("div", {
                className:
                  "flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/60 p-3 rounded-2xl w-fit border border-indigo-800/50",
                children: [
                  _jsx(Bot, {
                    className: "w-4 h-4 animate-spin text-indigo-400",
                  }),
                  _jsx("span", {
                    children:
                      "Retrieving knowledge chunks and formulating response...",
                  }),
                ],
              }),
            _jsx("div", { ref: messagesEndRef }),
          ],
        }),
        _jsxs("div", {
          className:
            "p-3 sm:p-4 bg-slate-900/70 border-t border-slate-800 shrink-0",
          children: [
            _jsxs("form", {
              onSubmit: (e) => {
                e.preventDefault();
                handleSend();
              },
              className: "flex items-center gap-2",
              children: [
                _jsx("input", {
                  type: "text",
                  id: "rag-modal-input-field",
                  value: inputQuery,
                  onChange: (e) => setInputQuery(e.target.value),
                  placeholder: `Ask any question about ${selectedPillar === "general" ? "Women Rights, Health, or Career" : selectedPillar}...`,
                  className:
                    "flex-1 px-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:bg-slate-800 text-white placeholder:text-slate-500",
                }),
                _jsxs("button", {
                  type: "submit",
                  disabled: !inputQuery.trim() || loading,
                  id: "rag-modal-send-btn",
                  className:
                    "px-5 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-full font-bold text-sm flex items-center gap-1.5 shadow-md shadow-rose-900/50 transition-all cursor-pointer",
                  children: [
                    _jsx(Send, { className: "w-4 h-4" }),
                    _jsx("span", {
                      className: "hidden sm:inline",
                      children: "Ask",
                    }),
                  ],
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between mt-2 text-[10px] text-slate-500 px-1",
              children: [
                _jsx("span", {
                  children:
                    "Powered by Pluggable Vector Retriever + Context Synthesis",
                }),
                _jsx("span", {
                  children: "Zero Data Logging \u2022 Fully Confidential",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
