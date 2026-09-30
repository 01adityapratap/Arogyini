import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import {
  Heart,
  Scale,
  Briefcase,
  ShieldAlert,
  Bot,
  Sparkles,
  ArrowRight,
  Activity,
  Plus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";
import { PeriodTrackerModal } from "../components/PeriodTrackerModal.jsx";
export const Dashboard = ({ setActiveTab, onOpenRAG, onTriggerSOS }) => {
  const { user, activeSOSEvent } = useAuth();
  const [cycleData, setCycleData] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
  useEffect(() => {
    api
      .getCycleSummary()
      .then((res) => setCycleData(res))
      .catch(() => {});
    api
      .getHealthRecords()
      .then((res) => setHealthRecords(res.records.slice(0, 3)))
      .catch(() => {});
    api
      .getJobs()
      .then((res) => {
        const saved = res.jobs.filter((j) => user?.savedJobs?.includes(j.id));
        setSavedJobs(saved.length > 0 ? saved : res.jobs.slice(0, 2));
      })
      .catch(() => {});
  }, [user]);
  return _jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
    children: [
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 text-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-teal-500/10 border border-white/80",
        children: [
          _jsxs("div", {
            className: "space-y-2 relative z-10",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider text-rose-700 border border-white",
                children: [
                  _jsx(Sparkles, { className: "w-3.5 h-3.5 text-rose-500" }),
                  _jsxs("span", {
                    children: ["Welcome back, ", user?.name || "Aanya"],
                  }),
                ],
              }),
              _jsx("h1", {
                className:
                  "font-serif text-2xl sm:text-4xl font-bold text-slate-900",
                children: "Your Holistic Wellness & Safety Hub",
              }),
              _jsx("p", {
                className: "text-xs sm:text-sm text-slate-600 max-w-xl",
                children:
                  "Everything is synchronized: your cycle markers, legal grievance toolkits, saved career opportunities, and SOS emergency readiness.",
              }),
            ],
          }),
          _jsxs("div", {
            className: "flex flex-wrap gap-2.5 shrink-0 relative z-10",
            children: [
              _jsxs("button", {
                onClick: () => onOpenRAG(),
                className:
                  "px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-md shadow-indigo-200 cursor-pointer",
                children: [
                  _jsx(Bot, { className: "w-4 h-4 text-indigo-200" }),
                  _jsx("span", { children: "Arogyini AI Guide" }),
                ],
              }),
              _jsxs("button", {
                onClick: onTriggerSOS,
                className:
                  "px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-md shadow-rose-200 cursor-pointer",
                children: [
                  _jsx(ShieldAlert, { className: "w-4 h-4 text-white" }),
                  _jsx("span", { children: "Instant SOS Alert" }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        children: [
          _jsxs("div", {
            onClick: () => setActiveTab("health"),
            className:
              "glass-card-rose rounded-3xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3",
            children: [
              _jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  _jsx("div", {
                    className:
                      "w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-600 flex items-center justify-center font-bold",
                    children: _jsx(Heart, { className: "w-5 h-5" }),
                  }),
                  _jsxs("span", {
                    className:
                      "text-[10px] font-bold uppercase bg-rose-100/80 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200/60",
                    children: ["Day ", cycleData?.currentCycleDay || 1],
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsx("h4", {
                    className: "font-bold text-slate-900 text-sm",
                    children: cycleData?.currentPhase || "Follicular Phase",
                  }),
                  _jsxs("p", {
                    className: "text-xs text-slate-500 mt-0.5",
                    children: [
                      "Next Period: ",
                      cycleData?.nextPredictedPeriod || "Aug 28",
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                className:
                  "text-xs text-rose-600 font-bold flex items-center gap-1",
                children: [
                  _jsx("span", { children: "Log cycle data" }),
                  " ",
                  _jsx(ArrowRight, { className: "w-3 h-3" }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            onClick: () => setActiveTab("legal"),
            className:
              "glass-card-indigo rounded-3xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3",
            children: [
              _jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  _jsx("div", {
                    className:
                      "w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-700 flex items-center justify-center font-bold",
                    children: _jsx(Scale, { className: "w-5 h-5" }),
                  }),
                  _jsx("span", {
                    className:
                      "text-[10px] font-bold uppercase bg-indigo-100/80 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200/60",
                    children: "POSH / PWDVA",
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsx("h4", {
                    className: "font-bold text-slate-900 text-sm",
                    children: "Know Your Rights",
                  }),
                  _jsx("p", {
                    className: "text-xs text-slate-500 mt-0.5",
                    children: "Draft complaints & access 24x7 NALSA aid",
                  }),
                ],
              }),
              _jsxs("div", {
                className:
                  "text-xs text-indigo-700 font-bold flex items-center gap-1",
                children: [
                  _jsx("span", { children: "Explore legal acts" }),
                  " ",
                  _jsx(ArrowRight, { className: "w-3 h-3" }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            onClick: () => setActiveTab("career"),
            className:
              "glass-card-teal rounded-3xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3",
            children: [
              _jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  _jsx("div", {
                    className:
                      "w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-700 flex items-center justify-center font-bold",
                    children: _jsx(Briefcase, { className: "w-5 h-5" }),
                  }),
                  _jsx("span", {
                    className:
                      "text-[10px] font-bold uppercase bg-teal-100/80 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200/60",
                    children: "Returnships",
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsx("h4", {
                    className: "font-bold text-slate-900 text-sm",
                    children: "Opportunities & Grants",
                  }),
                  _jsx("p", {
                    className: "text-xs text-slate-500 mt-0.5",
                    children: "Pragati Scholarships & Tech Returnships",
                  }),
                ],
              }),
              _jsxs("div", {
                className:
                  "text-xs text-teal-700 font-bold flex items-center gap-1",
                children: [
                  _jsx("span", { children: "Browse job board" }),
                  " ",
                  _jsx(ArrowRight, { className: "w-3 h-3" }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            onClick: () => setActiveTab("safety"),
            className:
              "glass-card-rose rounded-3xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3",
            children: [
              _jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  _jsx("div", {
                    className:
                      "w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-700 flex items-center justify-center font-bold",
                    children: _jsx(ShieldAlert, { className: "w-5 h-5" }),
                  }),
                  _jsx("span", {
                    className: `text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${activeSOSEvent ? "bg-red-600 text-white animate-pulse" : "bg-emerald-100/80 text-emerald-800 border border-emerald-200/60"}`,
                    children: activeSOSEvent
                      ? "SOS Broadcasting"
                      : "Guard Active",
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsxs("h4", {
                    className: "font-bold text-slate-900 text-sm",
                    children: [
                      user?.emergencyContacts?.length || 3,
                      " Registered Guardians",
                    ],
                  }),
                  _jsx("p", {
                    className: "text-xs text-slate-500 mt-0.5",
                    children: "Pink Patrol 112 & Safe Haven Radar",
                  }),
                ],
              }),
              _jsxs("div", {
                className:
                  "text-xs text-rose-600 font-bold flex items-center gap-1",
                children: [
                  _jsx("span", { children: "Open Safety Hub" }),
                  " ",
                  _jsx(ArrowRight, { className: "w-3 h-3" }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
        children: [
          _jsx("div", {
            className: "lg:col-span-7 space-y-6",
            children: _jsxs("div", {
              className:
                "glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-4",
              children: [
                _jsxs("div", {
                  className:
                    "flex items-center justify-between border-b border-white/60 pb-4",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        _jsx(Activity, { className: "w-5 h-5 text-rose-600" }),
                        _jsx("h3", {
                          className:
                            "font-serif text-lg font-bold text-slate-900",
                          children: "Recent Health & Cycle Logs",
                        }),
                      ],
                    }),
                    _jsxs("button", {
                      onClick: () => setIsPeriodModalOpen(true),
                      className:
                        "px-3.5 py-1.5 bg-rose-100/80 hover:bg-rose-200/80 text-rose-700 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer transition-all border border-rose-200/60",
                      children: [
                        _jsx(Plus, { className: "w-3.5 h-3.5" }),
                        _jsx("span", { children: "Log Cycle Entry" }),
                      ],
                    }),
                  ],
                }),
                _jsx("div", {
                  className: "space-y-3",
                  children: healthRecords.map((record) =>
                    _jsxs(
                      "div",
                      {
                        className:
                          "p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 flex items-start justify-between gap-4 text-xs shadow-2xs",
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
                                    children: record.title,
                                  }),
                                  _jsx("span", {
                                    className:
                                      "text-[10px] bg-rose-100/80 text-rose-700 px-2 py-0.5 rounded-full font-semibold uppercase border border-rose-200/50",
                                    children: record.type,
                                  }),
                                ],
                              }),
                              record.details?.symptoms &&
                                _jsxs("p", {
                                  className: "text-slate-600",
                                  children: [
                                    "Symptoms: ",
                                    _jsx("strong", {
                                      children:
                                        record.details.symptoms.join(", "),
                                    }),
                                  ],
                                }),
                              record.details?.notes &&
                                _jsx("p", {
                                  className: "text-slate-500 italic",
                                  children: record.details.notes,
                                }),
                            ],
                          }),
                          _jsx("span", {
                            className: "text-slate-400 font-mono shrink-0",
                            children: record.date,
                          }),
                        ],
                      },
                      record.id,
                    ),
                  ),
                }),
                _jsx("button", {
                  onClick: () => setActiveTab("health"),
                  className:
                    "w-full py-2.5 text-center text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50/50 hover:bg-rose-100/60 rounded-2xl transition-colors cursor-pointer border border-rose-200/50",
                  children:
                    "Open Full Health Management & ML Risk Screener \u2192",
                }),
              ],
            }),
          }),
          _jsxs("div", {
            className: "lg:col-span-5 space-y-6",
            children: [
              _jsxs("div", {
                className:
                  "glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-4",
                children: [
                  _jsxs("div", {
                    className: "flex items-center gap-2 text-indigo-900",
                    children: [
                      _jsx(Scale, { className: "w-5 h-5 text-indigo-600" }),
                      _jsx("h3", {
                        className:
                          "font-serif text-lg font-bold text-slate-900",
                        children: "Legal Protection Toolkit",
                      }),
                    ],
                  }),
                  _jsx("p", {
                    className: "text-xs text-slate-600",
                    children:
                      "Instant access to complaint drafts under POSH Act 2013 and Domestic Violence provisions.",
                  }),
                  _jsxs("div", {
                    className: "space-y-2",
                    children: [
                      _jsxs("button", {
                        onClick: () => setActiveTab("legal"),
                        className:
                          "w-full p-3 bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/80 text-indigo-900 rounded-2xl text-xs font-bold flex items-center justify-between text-left transition-all cursor-pointer",
                        children: [
                          _jsx("span", {
                            children: "Draft POSH ICC Formal Complaint",
                          }),
                          _jsx(ArrowRight, {
                            className: "w-3.5 h-3.5 text-indigo-700",
                          }),
                        ],
                      }),
                      _jsxs("button", {
                        onClick: () => onOpenRAG("legal"),
                        className:
                          "w-full p-3 bg-white/60 hover:bg-white/90 border border-white/80 text-slate-800 rounded-2xl text-xs font-bold flex items-center justify-between text-left transition-all cursor-pointer shadow-2xs",
                        children: [
                          _jsx("span", {
                            children: "Ask AI about Zero FIR & Police Rules",
                          }),
                          _jsx(Bot, {
                            className: "w-3.5 h-3.5 text-indigo-600",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                className:
                  "glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-4",
                children: [
                  _jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      _jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          _jsx(Briefcase, {
                            className: "w-5 h-5 text-teal-600",
                          }),
                          _jsx("h3", {
                            className:
                              "font-serif text-lg font-bold text-slate-900",
                            children: "Featured Career Matches",
                          }),
                        ],
                      }),
                      _jsx("button", {
                        onClick: () => setActiveTab("career"),
                        className:
                          "text-xs font-bold text-teal-700 hover:underline cursor-pointer",
                        children: "View all",
                      }),
                    ],
                  }),
                  _jsx("div", {
                    className: "space-y-3",
                    children: savedJobs.map((job) =>
                      _jsxs(
                        "div",
                        {
                          className:
                            "p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 text-xs space-y-1 shadow-2xs",
                          children: [
                            _jsxs("div", {
                              className: "flex items-center justify-between",
                              children: [
                                _jsx("span", {
                                  className: "font-bold text-slate-900",
                                  children: job.title,
                                }),
                                _jsx("span", {
                                  className:
                                    "text-[10px] bg-teal-100/80 text-teal-800 px-2 py-0.5 rounded-full font-semibold border border-teal-200/50",
                                  children: job.type,
                                }),
                              ],
                            }),
                            _jsxs("p", {
                              className: "text-slate-500",
                              children: [job.company, " \u2022 ", job.location],
                            }),
                          ],
                        },
                        job.id,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsx(PeriodTrackerModal, {
        isOpen: isPeriodModalOpen,
        onClose: () => setIsPeriodModalOpen(false),
        onLogged: () => {
          api
            .getHealthRecords()
            .then((res) => setHealthRecords(res.records.slice(0, 3)));
          api.getCycleSummary().then((res) => setCycleData(res));
        },
      }),
    ],
  });
};
