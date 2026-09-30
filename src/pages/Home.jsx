import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import {
  Heart,
  Scale,
  Briefcase,
  ShieldAlert,
  Bot,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Activity,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { SOSButton } from "../components/SOSButton.jsx";
import { useAuth } from "../context/AuthContext.jsx";
export const Home = ({ setActiveTab, onOpenRAG }) => {
  const { user } = useAuth();
  const pillars = [
    {
      id: "health",
      title: "Health Care & Cycles",
      subtitle: "Predictive Wellness & Period Tracking",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      glassClass: "glass-card-rose",
      badgeClass: "bg-rose-100/80 text-rose-700 border border-rose-200/60",
      description:
        "AI/ML powered PCOS screening, menstrual cycle tracking, nutritional guidance, and confidential reproductive health logs.",
      bullets: [
        "Menstrual Cycle & Ovulation Prediction",
        "ML PCOS & Anemia Risk Screening",
        "Gynecological Care Compendium",
      ],
    },
    {
      id: "legal",
      title: "Legal Awareness & Rights",
      subtitle: "POSH, Domestic Safety & Zero FIR",
      icon: Scale,
      color: "from-indigo-500 to-purple-600",
      glassClass: "glass-card-indigo",
      badgeClass:
        "bg-indigo-100/80 text-indigo-800 border border-indigo-200/60",
      description:
        "Instant legal knowledge on workplace harassment (POSH), domestic violence (PWDVA), maternity entitlements, and automated FIR complaint drafting.",
      bullets: [
        "POSH Act 90-Day ICC Procedure Guide",
        "Interactive Formal Complaint Drafter",
        "24x7 NALSA & State Legal Aid Directory",
      ],
    },
    {
      id: "career",
      title: "Career & Empowerment",
      subtitle: "Returnships, Grants & Mentorship",
      icon: Briefcase,
      color: "from-teal-500 to-emerald-600",
      glassClass: "glass-card-teal",
      badgeClass: "bg-teal-100/80 text-teal-800 border border-teal-200/60",
      description:
        "Curated opportunities for women: Career break returnships, remote roles, Government STEM scholarships (AICTE Pragati), and executive mentorship.",
      bullets: [
        "Career Returnships (1-5 Year Gap)",
        "Govt & Private Women Scholarships",
        "Equal Pay & Remote Job Postings",
      ],
    },
    {
      id: "safety",
      title: "Real-Time SOS & Safety",
      subtitle: "GPS Broadcast & Safe Havens",
      icon: ShieldAlert,
      color: "from-rose-500 to-red-600",
      glassClass: "glass-card-rose",
      badgeClass: "bg-rose-100/80 text-rose-800 border border-rose-200/60",
      description:
        "1-Tap emergency distress alert with live GPS coordinates broadcast to guardians and nearest Police Pink Patrol (112/1091).",
      bullets: [
        "1-Tap SOS with 3s Anti-Misclick Buffer",
        "Safe Zone Radar & 24x7 Pink Booths",
        "Audio Deterrence Siren & Fake Call Exit",
      ],
    },
  ];
  return _jsxs("div", {
    className: "space-y-12 pb-12",
    children: [
      _jsx("section", {
        className: "relative pt-8 sm:pt-14 pb-12",
        children: _jsx("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          children: _jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center",
            children: [
              _jsxs("div", {
                className: "lg:col-span-7 space-y-6",
                children: [
                  _jsxs("div", {
                    className:
                      "inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/70 backdrop-blur-md border border-white/80 rounded-full text-xs font-bold text-rose-700 uppercase tracking-wider shadow-2xs",
                    children: [
                      _jsx(Sparkles, {
                        className: "w-3.5 h-3.5 text-rose-500",
                      }),
                      _jsx("span", {
                        children: "Empowering Women Across India",
                      }),
                    ],
                  }),
                  _jsxs("h1", {
                    className:
                      "font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]",
                    children: [
                      "A Safe, Informed & ",
                      _jsx("br", {}),
                      _jsx("span", {
                        className:
                          "bg-gradient-to-r from-rose-600 via-purple-600 to-teal-600 bg-clip-text text-transparent",
                        children: "Opportunity-Driven",
                      }),
                      " ",
                      "Ecosystem",
                    ],
                  }),
                  _jsxs("p", {
                    className:
                      "text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl",
                    children: [
                      _jsx("strong", { children: "AROGYINI" }),
                      " is a holistic digital platform integrating four vital pillars \u2014",
                      " ",
                      _jsx("span", {
                        className: "text-rose-600 font-semibold",
                        children: "Healthcare",
                      }),
                      ",",
                      " ",
                      _jsx("span", {
                        className: "text-indigo-600 font-semibold",
                        children: "Legal Rights",
                      }),
                      ",",
                      " ",
                      _jsx("span", {
                        className: "text-teal-600 font-semibold",
                        children: "Career Growth",
                      }),
                      ", and",
                      " ",
                      _jsx("span", {
                        className: "text-rose-600 font-semibold",
                        children: "Emergency SOS Safety",
                      }),
                      " \u2014 powered by pluggable AI Retrieval-Augmented Generation (RAG).",
                    ],
                  }),
                  _jsxs("div", {
                    className: "flex flex-wrap items-center gap-3 pt-2",
                    children: [
                      _jsxs("button", {
                        id: "hero-ask-ai-btn",
                        onClick: () => onOpenRAG(),
                        className:
                          "px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95 cursor-pointer",
                        children: [
                          _jsx(Bot, { className: "w-4 h-4 text-indigo-200" }),
                          _jsx("span", { children: "Ask Arogyini RAG AI" }),
                          _jsx(ArrowRight, { className: "w-4 h-4" }),
                        ],
                      }),
                      _jsxs("button", {
                        onClick: () => setActiveTab("health"),
                        className:
                          "px-5 py-3.5 bg-white/70 hover:bg-white/90 backdrop-blur-md text-slate-800 border border-white/80 rounded-full text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs",
                        children: [
                          _jsx(Activity, {
                            className: "w-4 h-4 text-rose-500",
                          }),
                          _jsx("span", {
                            children: "Explore Health & Cycle Care",
                          }),
                        ],
                      }),
                      _jsxs("button", {
                        onClick: () => setActiveTab("rag-inspector"),
                        className:
                          "px-4 py-3.5 bg-purple-500/10 hover:bg-purple-500/20 backdrop-blur-md text-purple-700 border border-purple-200/70 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                        children: [
                          _jsx(Layers, {
                            className: "w-3.5 h-3.5 text-purple-600",
                          }),
                          _jsx("span", { children: "RAG & ML Architecture" }),
                        ],
                      }),
                    ],
                  }),
                  _jsxs("div", {
                    className: "pt-4 space-y-2",
                    children: [
                      _jsx("span", {
                        className:
                          "text-xs font-bold text-slate-500 uppercase tracking-wider",
                        children: "Try asking the RAG Engine:",
                      }),
                      _jsx("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                          {
                            q: "What is the time limit for filing a POSH complaint?",
                            pillar: "legal",
                          },
                          {
                            q: "How to manage PCOS through diet and lifestyle?",
                            pillar: "health",
                          },
                          {
                            q: "What government scholarships support women in tech?",
                            pillar: "career",
                          },
                        ].map((p, idx) =>
                          _jsxs(
                            "button",
                            {
                              onClick: () => onOpenRAG(p.pillar),
                              className:
                                "text-xs bg-white/60 hover:bg-white/90 backdrop-blur-sm border border-white/80 text-slate-700 hover:text-rose-600 px-3.5 py-1.5 rounded-full transition-all cursor-pointer text-left flex items-center gap-1.5 shadow-2xs",
                              children: [
                                _jsx(Sparkles, {
                                  className: "w-3 h-3 text-rose-500 shrink-0",
                                }),
                                _jsx("span", { children: p.q }),
                              ],
                            },
                            idx,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              _jsx("div", {
                className: "lg:col-span-5",
                children: _jsx(SOSButton, { variant: "card" }),
              }),
            ],
          }),
        }),
      }),
      _jsxs("section", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8",
        children: [
          _jsxs("div", {
            className: "text-center max-w-3xl mx-auto space-y-2",
            children: [
              _jsx("span", {
                className:
                  "text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-100/70 backdrop-blur-sm px-3.5 py-1 rounded-full border border-rose-200/60",
                children: "Four Core Pillars",
              }),
              _jsx("h2", {
                className:
                  "font-serif text-3xl sm:text-4xl font-bold text-slate-900",
                children: "Everything A Woman Needs in One Unified Platform",
              }),
              _jsx("p", {
                className: "text-sm sm:text-base text-slate-600",
                children:
                  "Eliminating fragmented tools by combining medical screening, legal protection, career equity, and personal safety.",
              }),
            ],
          }),
          _jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: pillars.map((p) => {
              const Icon = p.icon;
              return _jsxs(
                "div",
                {
                  id: `home-pillar-${p.id}`,
                  onClick: () => setActiveTab(p.id),
                  className: `glass-panel rounded-3xl p-6 sm:p-8 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between ${p.glassClass}`,
                  children: [
                    _jsxs("div", {
                      className: "space-y-4",
                      children: [
                        _jsxs("div", {
                          className: "flex items-center justify-between",
                          children: [
                            _jsx("div", {
                              className: `w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`,
                              children: _jsx(Icon, { className: "w-6 h-6" }),
                            }),
                            _jsx("span", {
                              className: `text-[11px] font-bold px-3 py-1 rounded-full ${p.badgeClass}`,
                              children: p.subtitle,
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          children: [
                            _jsx("h3", {
                              className:
                                "font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors",
                              children: p.title,
                            }),
                            _jsx("p", {
                              className:
                                "text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed",
                              children: p.description,
                            }),
                          ],
                        }),
                        _jsx("ul", {
                          className:
                            "space-y-2 pt-3 border-t border-white/60 text-xs text-slate-700",
                          children: p.bullets.map((b, bIdx) =>
                            _jsxs(
                              "li",
                              {
                                className: "flex items-center gap-2",
                                children: [
                                  _jsx(CheckCircle2, {
                                    className:
                                      "w-3.5 h-3.5 text-emerald-600 shrink-0",
                                  }),
                                  _jsx("span", { children: b }),
                                ],
                              },
                              bIdx,
                            ),
                          ),
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "pt-6 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform",
                      children: [
                        _jsxs("span", { children: ["Explore ", p.title] }),
                        _jsx(ArrowRight, { className: "w-4 h-4" }),
                      ],
                    }),
                  ],
                },
                p.id,
              );
            }),
          }),
        ],
      }),
      _jsx("section", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: _jsxs("div", {
          className:
            "glass-dark text-white rounded-3xl p-6 sm:p-8 border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl",
          children: [
            _jsxs("div", {
              className: "space-y-1",
              children: [
                _jsxs("div", {
                  className:
                    "flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider",
                  children: [
                    _jsx(PhoneCall, { className: "w-4 h-4 animate-pulse" }),
                    _jsx("span", {
                      children: "National Safety Helpline Network",
                    }),
                  ],
                }),
                _jsx("h3", {
                  className: "font-serif text-2xl font-bold text-white",
                  children: "Always Available. 100% Toll-Free.",
                }),
                _jsx("p", {
                  className: "text-xs sm:text-sm text-slate-400 max-w-xl",
                  children:
                    "In any critical scenario, immediate police dispatch and crisis counseling is available across India.",
                }),
              ],
            }),
            _jsx("div", {
              className: "grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0",
              children: [
                { label: "Police / Emergency", num: "112" },
                { label: "Women in Distress", num: "181" },
                { label: "Women Police", num: "1091" },
                { label: "Cyber Crime", num: "1930" },
              ].map((item, idx) =>
                _jsxs(
                  "a",
                  {
                    href: `tel:${item.num}`,
                    className:
                      "p-3.5 bg-slate-800/80 hover:bg-slate-700/90 rounded-2xl border border-slate-700/60 text-center transition-all block shadow-2xs",
                    children: [
                      _jsx("span", {
                        className:
                          "text-[10px] text-slate-400 block uppercase font-semibold",
                        children: item.label,
                      }),
                      _jsx("span", {
                        className:
                          "font-mono text-lg font-black text-rose-400 mt-0.5 block",
                        children: item.num,
                      }),
                    ],
                  },
                  idx,
                ),
              ),
            }),
          ],
        }),
      }),
    ],
  });
};
