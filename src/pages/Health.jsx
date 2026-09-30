import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  Sparkles,
  Droplets,
  Activity,
  Plus,
  Apple,
  Brain,
  PhoneCall,
  Bot,
  CheckCircle2,
} from "lucide-react";
import { api } from "../services/api.js";
import { PeriodTrackerModal } from "../components/PeriodTrackerModal.jsx";
import { HealthRiskPredictor } from "../components/HealthRiskPredictor.jsx";
export const Health = ({ onOpenRAG }) => {
  const [cycleData, setCycleData] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tracker");
  const fetchHealthData = async () => {
    try {
      const cycle = await api.getCycleSummary();
      setCycleData(cycle);
      const records = await api.getHealthRecords();
      setHealthRecords(records.records);
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    fetchHealthData();
  }, []);
  const gynecologists = [
    {
      name: "Dr. Meera Sen, MD (OB-GYN)",
      hospital: "Arogyini Women Health Clinic",
      exp: "14+ Yrs Exp",
      specialty: "PCOS, Fertility & Menstrual Disorders",
      contact: "080-23456789",
      available: "Today 4:00 PM - 8:00 PM",
    },
    {
      name: "Dr. Ananya Kulkarni, MS (OBG)",
      hospital: "Vani Vilas Womens Hospital",
      exp: "18+ Yrs Exp",
      specialty: "High-Risk Pregnancy & Endocrine Care",
      contact: "080-26705881",
      available: "Mon - Sat (Govt Subsidized)",
    },
    {
      name: "Dr. Sneha Roy, MBBS, DGO",
      hospital: "Sakhi Comprehensive Center",
      exp: "9+ Yrs Exp",
      specialty: "Adolescent Care & Nutrition Wellness",
      contact: "1800-425-9477",
      available: "Toll-Free Tele-Consultation",
    },
  ];
  return _jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
    children: [
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-rose-500/15 via-pink-500/10 to-teal-500/10 border border-white/80",
        children: [
          _jsxs("div", {
            className: "space-y-2 relative z-10",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider text-rose-700 border border-white",
                children: [
                  _jsx(Heart, { className: "w-3.5 h-3.5 text-rose-500" }),
                  _jsx("span", {
                    children:
                      "Pillar 1 \u2022 Healthcare & Menstrual Intelligence",
                  }),
                ],
              }),
              _jsx("h1", {
                className:
                  "font-serif text-2xl sm:text-4xl font-bold text-slate-900",
                children: "Women's Health, Cycles & AI Screening",
              }),
              _jsx("p", {
                className: "text-xs sm:text-sm text-slate-600 max-w-xl",
                children:
                  "Track cycles with end-to-end privacy, screen for PCOS and anemia via ML models, and consult trusted gynecologists.",
              }),
            ],
          }),
          _jsxs("div", {
            className: "flex flex-wrap gap-2.5 shrink-0 relative z-10",
            children: [
              _jsxs("button", {
                onClick: () => setIsLogModalOpen(true),
                className:
                  "px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-md shadow-rose-200 cursor-pointer",
                children: [
                  _jsx(Plus, { className: "w-4 h-4" }),
                  _jsx("span", { children: "Log Cycle Entry" }),
                ],
              }),
              _jsxs("button", {
                onClick: () => onOpenRAG("health"),
                className:
                  "px-5 py-2.5 bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/80 text-rose-700 font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-xs cursor-pointer",
                children: [
                  _jsx(Bot, { className: "w-4 h-4 text-rose-600" }),
                  _jsx("span", { children: "Ask Health RAG AI" }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsx("div", {
        className:
          "flex items-center gap-2 border-b border-white/60 pb-3 overflow-x-auto",
        children: [
          { id: "tracker", label: "Cycle Tracker & Logs", icon: Calendar },
          {
            id: "screener",
            label: "ML PCOS & Anemia Screener",
            icon: Activity,
          },
          { id: "wellness", label: "Nutrition & Mental Health", icon: Apple },
          {
            id: "doctors",
            label: "Gynecologist Consultations",
            icon: PhoneCall,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSel = activeTab === tab.id;
          return _jsxs(
            "button",
            {
              onClick: () => setActiveTab(tab.id),
              className: `px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                isSel
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200 border border-rose-400/50"
                  : "bg-white/60 hover:bg-white/90 text-slate-700 border border-white/80"
              }`,
              children: [
                _jsx(Icon, { className: "w-4 h-4" }),
                _jsx("span", { children: tab.label }),
              ],
            },
            tab.id,
          );
        }),
      }),
      activeTab === "tracker" &&
        _jsxs("div", {
          className: "space-y-8",
          children: [
            _jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6",
              children: [
                _jsxs("div", {
                  className: "glass-panel rounded-3xl p-6 shadow-xs space-y-4",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        _jsx("span", {
                          className:
                            "text-xs font-bold text-rose-700 uppercase tracking-wider",
                          children: "Menstrual Phase",
                        }),
                        _jsx(Droplets, { className: "w-4 h-4 text-rose-500" }),
                      ],
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("h3", {
                          className:
                            "font-serif text-2xl font-bold text-slate-900",
                          children:
                            cycleData?.currentPhase || "Follicular Phase",
                        }),
                        _jsxs("p", {
                          className: "text-xs text-slate-500 mt-1",
                          children: [
                            "Day ",
                            _jsx("strong", {
                              children: cycleData?.currentCycleDay || 1,
                            }),
                            " of ",
                            cycleData?.cycleLength || 28,
                            "-day cycle",
                          ],
                        }),
                      ],
                    }),
                    _jsx("div", {
                      className:
                        "w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-white/80",
                      children: _jsx("div", {
                        className:
                          "bg-rose-500 h-full rounded-full transition-all",
                        style: {
                          width: `${Math.min(100, ((cycleData?.currentCycleDay || 1) / (cycleData?.cycleLength || 28)) * 100)}%`,
                        },
                      }),
                    }),
                  ],
                }),
                _jsxs("div", {
                  className: "glass-panel rounded-3xl p-6 shadow-xs space-y-4",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        _jsx("span", {
                          className:
                            "text-xs font-bold text-purple-700 uppercase tracking-wider",
                          children: "Fertile Window",
                        }),
                        _jsx(Sparkles, {
                          className: "w-4 h-4 text-purple-500",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      children: [
                        _jsxs("h3", {
                          className:
                            "font-serif text-2xl font-bold text-slate-900",
                          children: [
                            cycleData?.fertileWindowStart || "Day 10",
                            " - ",
                            cycleData?.fertileWindowEnd || "Day 16",
                          ],
                        }),
                        _jsx("p", {
                          className: "text-xs text-slate-500 mt-1",
                          children:
                            "Peak Ovulation day estimated around Day 14",
                        }),
                      ],
                    }),
                    _jsx("div", {
                      className:
                        "text-xs text-purple-800 bg-purple-500/10 p-3 rounded-2xl border border-purple-200/60 font-medium",
                      children:
                        "High hormone peak \u2022 Increased vitality and endurance",
                    }),
                  ],
                }),
                _jsxs("div", {
                  className: "glass-panel rounded-3xl p-6 shadow-xs space-y-4",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        _jsx("span", {
                          className:
                            "text-xs font-bold text-teal-700 uppercase tracking-wider",
                          children: "Next Period",
                        }),
                        _jsx(Calendar, { className: "w-4 h-4 text-teal-600" }),
                      ],
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("h3", {
                          className:
                            "font-serif text-2xl font-bold text-slate-900",
                          children:
                            cycleData?.nextPredictedPeriod || "Aug 28, 2026",
                        }),
                        _jsx("p", {
                          className: "text-xs text-slate-500 mt-1",
                          children:
                            "Estimated in 14 days \u2022 Regular rhythm",
                        }),
                      ],
                    }),
                    _jsx("button", {
                      onClick: () => setIsLogModalOpen(true),
                      className:
                        "w-full py-2 bg-rose-50/70 hover:bg-rose-100/80 text-rose-700 text-xs font-bold rounded-full transition-colors cursor-pointer border border-rose-200/60",
                      children: "Log Today's Symptoms & Mood",
                    }),
                  ],
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "glass-panel rounded-3xl p-6 sm:p-8 shadow-xs space-y-4",
              children: [
                _jsxs("div", {
                  className:
                    "flex items-center justify-between border-b border-white/60 pb-4",
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsx("h3", {
                          className:
                            "font-serif text-xl font-bold text-slate-900",
                          children: "Recorded Health & Symptom Entries",
                        }),
                        _jsx("p", {
                          className: "text-xs text-slate-500",
                          children:
                            "Encrypted logs stored locally with zero cross-tracking",
                        }),
                      ],
                    }),
                    _jsxs("button", {
                      onClick: () => setIsLogModalOpen(true),
                      className:
                        "px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-200",
                      children: [
                        _jsx(Plus, { className: "w-3.5 h-3.5" }),
                        _jsx("span", { children: "Add Record" }),
                      ],
                    }),
                  ],
                }),
                _jsx("div", {
                  className: "space-y-3",
                  children: healthRecords.map((rec) =>
                    _jsxs(
                      "div",
                      {
                        className:
                          "p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-2xs",
                        children: [
                          _jsxs("div", {
                            className: "space-y-1",
                            children: [
                              _jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  _jsx("span", {
                                    className:
                                      "font-bold text-slate-900 text-sm",
                                    children: rec.title,
                                  }),
                                  _jsx("span", {
                                    className:
                                      "bg-rose-100/80 text-rose-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border border-rose-200/50",
                                    children: rec.type,
                                  }),
                                ],
                              }),
                              rec.details?.symptoms &&
                                _jsxs("p", {
                                  className: "text-slate-600",
                                  children: [
                                    "Symptoms: ",
                                    _jsx("span", {
                                      className: "font-semibold text-slate-800",
                                      children: rec.details.symptoms.join(", "),
                                    }),
                                  ],
                                }),
                              rec.details?.notes &&
                                _jsxs("p", {
                                  className:
                                    "text-slate-500 italic bg-white/80 p-2.5 rounded-xl border border-white max-w-lg shadow-2xs",
                                  children: ['"', rec.details.notes, '"'],
                                }),
                            ],
                          }),
                          _jsxs("div", {
                            className: "text-right shrink-0",
                            children: [
                              _jsx("span", {
                                className: "text-slate-400 font-mono block",
                                children: rec.date,
                              }),
                              _jsx("span", {
                                className:
                                  "text-[11px] text-emerald-700 font-medium",
                                children: "Logged",
                              }),
                            ],
                          }),
                        ],
                      },
                      rec.id,
                    ),
                  ),
                }),
              ],
            }),
          ],
        }),
      activeTab === "screener" && _jsx(HealthRiskPredictor, {}),
      activeTab === "wellness" &&
        _jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          children: [
            _jsxs("div", {
              className:
                "glass-panel p-6 sm:p-8 rounded-3xl shadow-xs space-y-4",
              children: [
                _jsxs("div", {
                  className:
                    "flex items-center gap-2 text-teal-700 font-bold text-xs uppercase",
                  children: [
                    _jsx(Apple, { className: "w-5 h-5 text-teal-600" }),
                    _jsx("span", {
                      children: "Phase-Based Nutritional Syncing",
                    }),
                  ],
                }),
                _jsx("h3", {
                  className: "font-serif text-xl font-bold text-slate-900",
                  children: "Fueling Your Body According to Cycle Phases",
                }),
                _jsxs("div", {
                  className: "space-y-3 text-xs text-slate-700",
                  children: [
                    _jsxs("div", {
                      className:
                        "p-3.5 bg-rose-500/10 rounded-2xl border border-rose-200/60 backdrop-blur-xs",
                      children: [
                        _jsx("span", {
                          className: "font-bold text-rose-900 block mb-0.5",
                          children: "Menstrual Phase (Days 1-5):",
                        }),
                        "Iron-rich foods (spinach, jaggery, beetroot, legumes) to replenish blood loss, warm ginger tea for anti-inflammatory relief.",
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "p-3.5 bg-purple-500/10 rounded-2xl border border-purple-200/60 backdrop-blur-xs",
                      children: [
                        _jsx("span", {
                          className: "font-bold text-purple-900 block mb-0.5",
                          children: "Follicular Phase (Days 6-12):",
                        }),
                        "Fermented foods (curd, kimchi), sprouting seeds (flax and pumpkin seeds) to support estrogen metabolism.",
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "p-3.5 bg-amber-500/10 rounded-2xl border border-amber-200/60 backdrop-blur-xs",
                      children: [
                        _jsx("span", {
                          className: "font-bold text-amber-900 block mb-0.5",
                          children: "Luteal Phase (Days 15-28):",
                        }),
                        "Magnesium-dense foods (dark chocolate, pumpkin seeds, bananas), complex carbohydrates to prevent PMS cravings.",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "glass-panel p-6 sm:p-8 rounded-3xl shadow-xs space-y-4",
              children: [
                _jsxs("div", {
                  className:
                    "flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase",
                  children: [
                    _jsx(Brain, { className: "w-5 h-5 text-indigo-600" }),
                    _jsx("span", {
                      children: "Mental Well-being & Stress Regulation",
                    }),
                  ],
                }),
                _jsx("h3", {
                  className: "font-serif text-xl font-bold text-slate-900",
                  children: "Coping with PMDD, Anxiety & Workplace Burnout",
                }),
                _jsx("p", {
                  className: "text-xs text-slate-600 leading-relaxed",
                  children:
                    "Fluctuations in progesterone and serotonin during the late luteal phase can amplify emotional fatigue.",
                }),
                _jsxs("div", {
                  className: "space-y-2 text-xs",
                  children: [
                    _jsxs("div", {
                      className:
                        "p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 flex items-start gap-2 shadow-2xs",
                      children: [
                        _jsx(CheckCircle2, {
                          className: "w-4 h-4 text-indigo-600 shrink-0 mt-0.5",
                        }),
                        _jsx("span", {
                          children:
                            "Practice 4-7-8 diaphragmatic breathing for 5 minutes during acute panic or stress spikes.",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 flex items-start gap-2 shadow-2xs",
                      children: [
                        _jsx(CheckCircle2, {
                          className: "w-4 h-4 text-indigo-600 shrink-0 mt-0.5",
                        }),
                        _jsx("span", {
                          children:
                            "Maintain a 7-8 hour sleep schedule to regulate cortisol and insulin levels.",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 flex items-start gap-2 shadow-2xs",
                      children: [
                        _jsx(CheckCircle2, {
                          className: "w-4 h-4 text-indigo-600 shrink-0 mt-0.5",
                        }),
                        _jsxs("span", {
                          children: [
                            "KIRAN Mental Health National Toll-Free Helpline: ",
                            _jsx("strong", { children: "1800-599-0019" }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      activeTab === "doctors" &&
        _jsxs("div", {
          className: "glass-panel rounded-3xl p-6 sm:p-8 shadow-xs space-y-6",
          children: [
            _jsxs("div", {
              children: [
                _jsx("h3", {
                  className: "font-serif text-2xl font-bold text-slate-900",
                  children: "Verified Women Healthcare Specialists",
                }),
                _jsx("p", {
                  className: "text-xs sm:text-sm text-slate-600",
                  children:
                    "Confidential, non-judgmental counseling on reproductive health, menstrual disorders, and contraceptive guidance.",
                }),
              ],
            }),
            _jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6",
              children: gynecologists.map((doc, idx) =>
                _jsxs(
                  "div",
                  {
                    className:
                      "bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/80 hover:border-rose-300 transition-all space-y-3 flex flex-col justify-between shadow-2xs",
                    children: [
                      _jsxs("div", {
                        className: "space-y-2",
                        children: [
                          _jsx("span", {
                            className:
                              "text-[10px] font-bold text-rose-700 bg-rose-100/80 border border-rose-200/50 px-2.5 py-0.5 rounded-full uppercase",
                            children: doc.exp,
                          }),
                          _jsx("h4", {
                            className: "font-bold text-slate-900 text-base",
                            children: doc.name,
                          }),
                          _jsx("p", {
                            className: "text-xs text-slate-600 font-medium",
                            children: doc.hospital,
                          }),
                          _jsx("p", {
                            className: "text-xs text-slate-500",
                            children: doc.specialty,
                          }),
                        ],
                      }),
                      _jsxs("div", {
                        className:
                          "pt-3 border-t border-white/80 space-y-2 text-xs",
                        children: [
                          _jsx("span", {
                            className:
                              "text-[11px] text-teal-700 font-semibold block",
                            children: doc.available,
                          }),
                          _jsxs("a", {
                            href: `tel:${doc.contact}`,
                            className:
                              "w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-200",
                            children: [
                              _jsx(PhoneCall, { className: "w-3.5 h-3.5" }),
                              _jsxs("span", {
                                children: ["Call Clinic (", doc.contact, ")"],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  idx,
                ),
              ),
            }),
          ],
        }),
      _jsx(PeriodTrackerModal, {
        isOpen: isLogModalOpen,
        onClose: () => setIsLogModalOpen(false),
        onLogged: fetchHealthData,
      }),
    ],
  });
};
