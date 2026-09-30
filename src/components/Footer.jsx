import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import {
  Shield,
  Heart,
  Scale,
  Briefcase,
  Phone,
  ExternalLink,
} from "lucide-react";
import { api } from "../services/api.js";
export const Footer = ({ setActiveTab, onOpenRAG }) => {
  const [ragStatus, setRagStatus] = useState(null);
  useEffect(() => {
    api
      .getRAGStatus()
      .then((data) => setRagStatus(data))
      .catch(() => setRagStatus({ status: "embedded_fallback" }));
  }, []);
  const emergencyNumbers = [
    {
      label: "National Emergency",
      number: "112",
      desc: "Police / Fire / Medical GPS dispatch",
    },
    {
      label: "Women Helpline (24x7)",
      number: "181",
      desc: "Tele-counseling & rescue in distress",
    },
    {
      label: "Women Police Helpline",
      number: "1091",
      desc: "Direct state pink patrol response",
    },
    {
      label: "Cyber Crime Helpline",
      number: "1930",
      desc: "Online stalking & financial fraud",
    },
  ];
  return _jsxs("footer", {
    className:
      "relative mt-12 bg-slate-900/95 backdrop-blur-2xl text-slate-300 pt-12 pb-8 border-t border-slate-700/60 shadow-2xl",
    children: [
      _jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10",
        children: _jsx("div", {
          className:
            "bg-rose-950/40 backdrop-blur-xl border border-rose-800/50 rounded-3xl p-5 sm:p-6 shadow-sm",
          children: _jsxs("div", {
            className:
              "flex flex-col md:flex-row md:items-center justify-between gap-4",
            children: [
              _jsxs("div", {
                children: [
                  _jsxs("div", {
                    className:
                      "flex items-center gap-2 text-rose-300 font-bold text-base sm:text-lg",
                    children: [
                      _jsx(Phone, {
                        className: "w-5 h-5 animate-pulse text-rose-400",
                      }),
                      _jsx("span", {
                        children:
                          "Immediate 24x7 Emergency Helplines (Toll-Free)",
                      }),
                    ],
                  }),
                  _jsx("p", {
                    className: "text-xs text-rose-200/80 mt-0.5",
                    children:
                      "Always accessible toll-free across India from any mobile or landline without balance.",
                  }),
                ],
              }),
              _jsx("div", {
                className: "flex flex-wrap gap-2 sm:gap-3",
                children: emergencyNumbers.map((h) =>
                  _jsxs(
                    "a",
                    {
                      href: `tel:${h.number}`,
                      className:
                        "px-3.5 py-2 bg-rose-900/40 hover:bg-rose-900/80 border border-rose-700/40 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-2xs",
                      children: [
                        _jsxs("span", {
                          className: "text-rose-300",
                          children: [h.label, ":"],
                        }),
                        _jsx("span", {
                          className:
                            "text-sm text-yellow-300 underline font-mono",
                          children: h.number,
                        }),
                      ],
                    },
                    h.number,
                  ),
                ),
              }),
            ],
          }),
        }),
      }),
      _jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [
          _jsxs("div", {
            className:
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10",
            children: [
              _jsxs("div", {
                className: "lg:col-span-2 space-y-4",
                children: [
                  _jsxs("div", {
                    className: "flex items-center gap-2.5",
                    children: [
                      _jsx("div", {
                        className:
                          "w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white font-bold text-base shadow-md shadow-rose-900/50",
                        children: "A",
                      }),
                      _jsx("span", {
                        className:
                          "font-serif text-2xl font-bold tracking-tight text-white",
                        children: "AROGYINI",
                      }),
                    ],
                  }),
                  _jsx("p", {
                    className:
                      "text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md",
                    children:
                      "A holistic women-centric digital ecosystem designed to provide accessible guidance, personal safety, healthcare intelligence, and socio-economic empowerment across 4 core pillars.",
                  }),
                  _jsxs("div", {
                    className:
                      "p-3.5 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/70 max-w-md space-y-1.5",
                    children: [
                      _jsxs("div", {
                        className:
                          "flex items-center justify-between text-xs font-semibold",
                        children: [
                          _jsxs("span", {
                            className:
                              "text-slate-200 flex items-center gap-1.5",
                            children: [
                              _jsx(Shield, {
                                className: "w-3.5 h-3.5 text-indigo-400",
                              }),
                              "AI RAG Service Status:",
                            ],
                          }),
                          _jsxs("span", {
                            className: `px-2.5 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1.5 ${
                              ragStatus?.status === "connected"
                                ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/60"
                                : "bg-indigo-950/80 text-indigo-300 border border-indigo-700/60"
                            }`,
                            children: [
                              _jsx("span", {
                                className:
                                  "w-1.5 h-1.5 rounded-full bg-current animate-pulse",
                              }),
                              ragStatus?.status === "connected"
                                ? "External Python Microservice"
                                : "Embedded Grounded Engine",
                            ],
                          }),
                        ],
                      }),
                      _jsxs("p", {
                        className: "text-[11px] text-slate-400",
                        children: [
                          "Modular architecture enables direct plug-in of your custom Python RAG pipeline via",
                          " ",
                          _jsx("code", {
                            className: "text-indigo-300 font-mono",
                            children: "rag-service/main.py",
                          }),
                          ".",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsx("h4", {
                    className:
                      "text-xs font-bold text-white uppercase tracking-wider mb-3 text-slate-400",
                    children: "Core Pillars",
                  }),
                  _jsxs("ul", {
                    className: "space-y-2 text-xs",
                    children: [
                      _jsx("li", {
                        children: _jsxs("button", {
                          onClick: () => setActiveTab("health"),
                          className:
                            "hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300",
                          children: [
                            _jsx(Heart, {
                              className: "w-3.5 h-3.5 text-rose-400",
                            }),
                            " Health Care & Cycles",
                          ],
                        }),
                      }),
                      _jsx("li", {
                        children: _jsxs("button", {
                          onClick: () => setActiveTab("legal"),
                          className:
                            "hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300",
                          children: [
                            _jsx(Scale, {
                              className: "w-3.5 h-3.5 text-amber-400",
                            }),
                            " Legal Rights & POSH",
                          ],
                        }),
                      }),
                      _jsx("li", {
                        children: _jsxs("button", {
                          onClick: () => setActiveTab("career"),
                          className:
                            "hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300",
                          children: [
                            _jsx(Briefcase, {
                              className: "w-3.5 h-3.5 text-blue-400",
                            }),
                            " Career & Returnships",
                          ],
                        }),
                      }),
                      _jsx("li", {
                        children: _jsxs("button", {
                          onClick: () => setActiveTab("safety"),
                          className:
                            "hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-300",
                          children: [
                            _jsx(Shield, {
                              className: "w-3.5 h-3.5 text-emerald-400",
                            }),
                            " SOS & Safe Zones",
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsx("h4", {
                    className:
                      "text-xs font-bold text-white uppercase tracking-wider mb-3 text-slate-400",
                    children: "AI Intelligence",
                  }),
                  _jsxs("ul", {
                    className: "space-y-2 text-xs",
                    children: [
                      _jsx("li", {
                        children: _jsx("button", {
                          onClick: () => onOpenRAG("legal"),
                          className:
                            "hover:text-indigo-400 transition-colors text-left cursor-pointer text-slate-300",
                          children: "Ask Legal Rights RAG",
                        }),
                      }),
                      _jsx("li", {
                        children: _jsx("button", {
                          onClick: () => onOpenRAG("health"),
                          className:
                            "hover:text-indigo-400 transition-colors text-left cursor-pointer text-slate-300",
                          children: "PCOS & Wellness AI Guide",
                        }),
                      }),
                      _jsx("li", {
                        children: _jsx("button", {
                          onClick: () => onOpenRAG("career"),
                          className:
                            "hover:text-indigo-400 transition-colors text-left cursor-pointer text-slate-300",
                          children: "Govt Scholarship Finder",
                        }),
                      }),
                      _jsx("li", {
                        children: _jsx("button", {
                          onClick: () => setActiveTab("rag-inspector"),
                          className:
                            "hover:text-indigo-300 transition-colors text-left text-indigo-400 font-semibold cursor-pointer",
                          children: "RAG Architecture Lab \u2192",
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsx("h4", {
                    className:
                      "text-xs font-bold text-white uppercase tracking-wider mb-3 text-slate-400",
                    children: "Platform",
                  }),
                  _jsxs("ul", {
                    className: "space-y-2 text-xs",
                    children: [
                      _jsx("li", {
                        children: _jsx("button", {
                          onClick: () => setActiveTab("about"),
                          className:
                            "hover:text-rose-400 transition-colors cursor-pointer text-slate-300",
                          children: "About Arogyini",
                        }),
                      }),
                      _jsx("li", {
                        children: _jsx("button", {
                          onClick: () => setActiveTab("profile"),
                          className:
                            "hover:text-rose-400 transition-colors cursor-pointer text-slate-300",
                          children: "Emergency Contacts",
                        }),
                      }),
                      _jsx("li", {
                        children: _jsxs("a", {
                          href: "https://ncw.nic.in",
                          target: "_blank",
                          rel: "noreferrer",
                          className:
                            "hover:text-rose-400 transition-colors flex items-center gap-1 text-slate-300",
                          children: [
                            "National Commission for Women ",
                            _jsx(ExternalLink, {
                              className: "w-3 h-3 text-slate-500",
                            }),
                          ],
                        }),
                      }),
                      _jsx("li", {
                        children: _jsxs("a", {
                          href: "https://cybercrime.gov.in",
                          target: "_blank",
                          rel: "noreferrer",
                          className:
                            "hover:text-rose-400 transition-colors flex items-center gap-1 text-slate-300",
                          children: [
                            "National Cyber Portal ",
                            _jsx(ExternalLink, {
                              className: "w-3 h-3 text-slate-500",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            className:
              "pt-8 border-t border-slate-800 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500",
            children: [
              _jsxs("p", {
                children: [
                  "\u00A9 ",
                  new Date().getFullYear(),
                  " AROGYINI Digital Initiative. Built with high-security MERN + Modular AI/RAG.",
                ],
              }),
              _jsxs("div", {
                className:
                  "mt-2 sm:mt-0 flex justify-center gap-4 text-slate-400",
                children: [
                  _jsx("span", { children: "Confidentiality Guaranteed" }),
                  _jsx("span", { children: "\u2022" }),
                  _jsx("span", { children: "Zero-Log Privacy" }),
                  _jsx("span", { children: "\u2022" }),
                  _jsx("span", { children: "Toll-Free Emergency Dispatch" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
