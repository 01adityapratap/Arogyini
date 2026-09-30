import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { Calendar, Droplets, X } from "lucide-react";
import { api } from "../services/api.js";
export const PeriodTrackerModal = ({ isOpen, onClose, onLogged }) => {
  const [cycleData, setCycleData] = useState(null);
  const [logDate, setLogDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [flow, setFlow] = useState("medium");
  const [selectedSymptoms, setSelectedSymptoms] = useState([
    "Cramps",
    "Bloating",
  ]);
  const [mood, setMood] = useState("Calm");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (isOpen) {
      api
        .getCycleSummary()
        .then((data) => setCycleData(data))
        .catch(() => {});
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const symptomsOptions = [
    "Cramps",
    "Bloating",
    "Headache",
    "Breast Tenderness",
    "Fatigue",
    "Backache",
    "Acne",
    "Cravings",
  ];
  const moodOptions = [
    "Energetic",
    "Calm",
    "Sensitive",
    "Irritable",
    "Anxious",
    "Exhausted",
  ];
  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.addHealthRecord({
        type: "period",
        title: `Period Log (${flow} flow)`,
        date: logDate,
        details: {
          flow,
          symptoms: selectedSymptoms,
          mood,
          notes,
        },
      });
      if (onLogged) onLogged();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  return _jsx("div", {
    className:
      "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md",
    children: _jsxs("div", {
      className:
        "bg-white/95 backdrop-blur-2xl rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/80 max-h-[90vh] flex flex-col",
      children: [
        _jsxs("div", {
          className:
            "p-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white flex items-center justify-between shrink-0 shadow-xs",
          children: [
            _jsxs("div", {
              className: "flex items-center gap-2.5",
              children: [
                _jsx("div", {
                  className: "p-2 bg-white/20 backdrop-blur-xs rounded-2xl",
                  children: _jsx(Calendar, { className: "w-5 h-5 text-white" }),
                }),
                _jsxs("div", {
                  children: [
                    _jsx("h3", {
                      className: "font-serif text-lg font-bold",
                      children: "Log Menstrual Cycle & Symptoms",
                    }),
                    _jsx("p", {
                      className: "text-xs text-rose-100",
                      children: "Private, encrypted reproductive health record",
                    }),
                  ],
                }),
              ],
            }),
            _jsx("button", {
              onClick: onClose,
              className:
                "p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer transition-all",
              children: _jsx(X, { className: "w-5 h-5" }),
            }),
          ],
        }),
        _jsxs("form", {
          onSubmit: handleSave,
          className: "p-6 overflow-y-auto space-y-5 flex-1",
          children: [
            cycleData &&
              _jsxs("div", {
                className:
                  "p-4 bg-rose-500/10 backdrop-blur-xs border border-rose-200/60 rounded-2xl flex items-center justify-between text-xs shadow-2xs",
                children: [
                  _jsxs("div", {
                    children: [
                      _jsx("span", {
                        className:
                          "text-rose-700 font-bold uppercase tracking-wide",
                        children: "Current Phase:",
                      }),
                      _jsx("p", {
                        className:
                          "font-serif text-base font-bold text-slate-900",
                        children: cycleData.currentPhase,
                      }),
                      _jsxs("p", {
                        className: "text-slate-600 mt-0.5",
                        children: [
                          "Day ",
                          cycleData.currentCycleDay,
                          " of ",
                          cycleData.cycleLength,
                          "-day cycle",
                        ],
                      }),
                    ],
                  }),
                  _jsxs("div", {
                    className: "text-right",
                    children: [
                      _jsx("span", {
                        className: "text-slate-500",
                        children: "Next Expected:",
                      }),
                      _jsx("p", {
                        className: "font-bold text-slate-800",
                        children: cycleData.nextPredictedPeriod,
                      }),
                    ],
                  }),
                ],
              }),
            _jsxs("div", {
              children: [
                _jsx("label", {
                  className:
                    "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                  children: "Log Date",
                }),
                _jsx("input", {
                  type: "date",
                  value: logDate,
                  onChange: (e) => setLogDate(e.target.value),
                  className:
                    "w-full px-3.5 py-2.5 bg-white/80 border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 shadow-2xs",
                }),
              ],
            }),
            _jsxs("div", {
              children: [
                _jsx("label", {
                  className:
                    "block text-xs font-bold text-slate-700 uppercase mb-2",
                  children: "Bleeding / Flow Level",
                }),
                _jsx("div", {
                  className: "grid grid-cols-4 gap-2",
                  children: ["spotting", "light", "medium", "heavy"].map(
                    (lvl) =>
                      _jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setFlow(lvl),
                          className: `p-2.5 rounded-2xl border text-xs font-bold capitalize cursor-pointer transition-all ${
                            flow === lvl
                              ? "bg-rose-500 border-rose-500 text-white shadow-xs"
                              : "bg-white/80 border-slate-200 text-slate-700 hover:bg-rose-50"
                          }`,
                          children: [
                            _jsx(Droplets, {
                              className: "w-3.5 h-3.5 mx-auto mb-1",
                            }),
                            _jsx("span", { children: lvl }),
                          ],
                        },
                        lvl,
                      ),
                  ),
                }),
              ],
            }),
            _jsxs("div", {
              children: [
                _jsx("label", {
                  className:
                    "block text-xs font-bold text-slate-700 uppercase mb-2",
                  children: "Mood & Energy",
                }),
                _jsx("div", {
                  className: "flex flex-wrap gap-1.5",
                  children: moodOptions.map((m) =>
                    _jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setMood(m),
                        className: `px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                          mood === m
                            ? "bg-purple-600 text-white font-semibold shadow-xs"
                            : "bg-white/80 border border-slate-200 hover:bg-white text-slate-700"
                        }`,
                        children: m,
                      },
                      m,
                    ),
                  ),
                }),
              ],
            }),
            _jsxs("div", {
              children: [
                _jsx("label", {
                  className:
                    "block text-xs font-bold text-slate-700 uppercase mb-2",
                  children: "Symptoms Experienced",
                }),
                _jsx("div", {
                  className: "flex flex-wrap gap-1.5",
                  children: symptomsOptions.map((sym) => {
                    const isSel = selectedSymptoms.includes(sym);
                    return _jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleSymptom(sym),
                        className: `px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                          isSel
                            ? "bg-rose-100/90 text-rose-800 border border-rose-300 font-semibold shadow-2xs"
                            : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200"
                        }`,
                        children: sym,
                      },
                      sym,
                    );
                  }),
                }),
              ],
            }),
            _jsxs("div", {
              children: [
                _jsx("label", {
                  className:
                    "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                  children: "Personal Notes / Remedies",
                }),
                _jsx("textarea", {
                  rows: 2,
                  value: notes,
                  onChange: (e) => setNotes(e.target.value),
                  placeholder:
                    "e.g. Took warm bath, herbal ginger tea, rested for 8 hours...",
                  className:
                    "w-full px-3.5 py-2.5 bg-white/80 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:bg-white shadow-2xs",
                }),
              ],
            }),
            _jsxs("div", {
              className: "pt-2 flex justify-end gap-2.5",
              children: [
                _jsx("button", {
                  type: "button",
                  onClick: onClose,
                  className:
                    "px-4 py-2 bg-white/80 hover:bg-white text-slate-700 rounded-full text-xs font-bold cursor-pointer border border-slate-200 transition-all",
                  children: "Cancel",
                }),
                _jsx("button", {
                  type: "submit",
                  disabled: saving,
                  className:
                    "px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold shadow-md shadow-rose-200 cursor-pointer transition-all",
                  children: saving ? "Saving..." : "Save Health Entry",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
