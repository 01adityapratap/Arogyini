import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import {
  Activity,
  HeartPulse,
  CheckCircle2,
  Sparkles,
  Apple,
  RefreshCw,
} from "lucide-react";
import { api } from "../services/api.js";
export const HealthRiskPredictor = () => {
  const [age, setAge] = useState(24);
  const [bmi, setBmi] = useState(23.2);
  const [cycleRegularity, setCycleRegularity] = useState("irregular");
  const [averageCycleLength, setAverageCycleLength] = useState(34);
  const [selectedSymptoms, setSelectedSymptoms] = useState([
    "Mild Cramps",
    "Fatigue",
    "Acne",
  ]);
  const [fatigueLevel, setFatigueLevel] = useState(6);
  const [stressLevel, setStressLevel] = useState(6);
  const [familyHistoryPCOS, setFamilyHistoryPCOS] = useState(true);
  const [familyHistoryThyroid, setFamilyHistoryThyroid] = useState(false);
  const [hemoglobin, setHemoglobin] = useState(11.8);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const symptomList = [
    "Mild Cramps",
    "Severe Pelvic Pain",
    "Acne / Breakouts",
    "Hair Thinning / Hirsutism",
    "Fatigue / Low Energy",
    "Dizziness / Cold Hands",
    "Mood Swings / Anxiety",
    "Weight Fluctuations",
    "Bloating / Water Retention",
    "Sleep Disturbances",
  ];
  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };
  const handlePredict = async () => {
    setLoading(true);
    try {
      const input = {
        age,
        bmi,
        cycleRegularity,
        averageCycleLength,
        symptoms: selectedSymptoms,
        fatigueLevel,
        stressLevel,
        familyHistoryPCOS,
        familyHistoryThyroid,
        hemoglobin,
      };
      const res = await api.predictHealthRisk(input);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return _jsxs("div", {
    className:
      "glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-sm space-y-6",
    children: [
      _jsxs("div", {
        className:
          "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/60 pb-5",
        children: [
          _jsxs("div", {
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100/80 text-rose-700 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5 border border-rose-200/60 backdrop-blur-xs",
                children: [
                  _jsx(HeartPulse, { className: "w-4 h-4 text-rose-600" }),
                  _jsx("span", { children: "AI / ML Risk Screening Model" }),
                ],
              }),
              _jsx("h3", {
                className: "font-serif text-2xl font-bold text-slate-900",
                children: "PCOS, Anemia & Endocrine Health Risk Assessor",
              }),
              _jsx("p", {
                className: "text-xs sm:text-sm text-slate-600",
                children:
                  "Trained on epidemiological markers and reproductive biomarkers for early preventative guidance.",
              }),
            ],
          }),
          _jsxs("button", {
            onClick: handlePredict,
            disabled: loading,
            className:
              "px-5 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-rose-200 transition-all cursor-pointer shrink-0",
            children: [
              loading
                ? _jsx(RefreshCw, { className: "w-4 h-4 animate-spin" })
                : _jsx(Sparkles, { className: "w-4 h-4 text-amber-300" }),
              _jsx("span", {
                children: loading
                  ? "Evaluating Model..."
                  : "Run ML Health Assessment",
              }),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-5",
        children: [
          _jsxs("div", {
            className:
              "space-y-4 bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/80 shadow-2xs",
            children: [
              _jsxs("h4", {
                className:
                  "text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5",
                children: [
                  _jsx(Activity, { className: "w-3.5 h-3.5 text-rose-600" }),
                  " 1. Cycle & Biometrics",
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsxs("label", {
                    className: "block text-xs font-medium text-slate-700 mb-1",
                    children: [
                      "Age: ",
                      _jsxs("span", {
                        className: "font-bold text-slate-900",
                        children: [age, " yrs"],
                      }),
                    ],
                  }),
                  _jsx("input", {
                    type: "range",
                    min: "14",
                    max: "55",
                    value: age,
                    onChange: (e) => setAge(Number(e.target.value)),
                    className: "w-full accent-rose-500",
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsxs("label", {
                    className: "block text-xs font-medium text-slate-700 mb-1",
                    children: [
                      "Estimated BMI: ",
                      _jsx("span", {
                        className: "font-bold text-slate-900",
                        children: bmi,
                      }),
                    ],
                  }),
                  _jsx("input", {
                    type: "range",
                    min: "15",
                    max: "40",
                    step: "0.5",
                    value: bmi,
                    onChange: (e) => setBmi(Number(e.target.value)),
                    className: "w-full accent-rose-500",
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsx("label", {
                    className: "block text-xs font-medium text-slate-700 mb-1",
                    children: "Cycle Regularity",
                  }),
                  _jsxs("select", {
                    value: cycleRegularity,
                    onChange: (e) => setCycleRegularity(e.target.value),
                    className:
                      "w-full px-3 py-2 bg-white/80 border border-white rounded-xl text-xs font-medium text-slate-800",
                    children: [
                      _jsx("option", {
                        value: "regular",
                        children: "Regular (25-32 days)",
                      }),
                      _jsx("option", {
                        value: "irregular",
                        children: "Irregular (Missed / >35 days)",
                      }),
                      _jsx("option", {
                        value: "variable",
                        children: "Variable / Spotting Only",
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsxs("label", {
                    className: "block text-xs font-medium text-slate-700 mb-1",
                    children: [
                      "Avg Cycle Duration: ",
                      _jsxs("span", {
                        className: "font-bold text-slate-900",
                        children: [averageCycleLength, " days"],
                      }),
                    ],
                  }),
                  _jsx("input", {
                    type: "range",
                    min: "20",
                    max: "60",
                    value: averageCycleLength,
                    onChange: (e) =>
                      setAverageCycleLength(Number(e.target.value)),
                    className: "w-full accent-rose-500",
                  }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            className:
              "space-y-4 bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/80 shadow-2xs",
            children: [
              _jsxs("h4", {
                className:
                  "text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5",
                children: [
                  _jsx(HeartPulse, { className: "w-3.5 h-3.5 text-rose-600" }),
                  " 2. Vitals & Energy",
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsxs("label", {
                    className: "block text-xs font-medium text-slate-700 mb-1",
                    children: [
                      "Daily Fatigue Level: ",
                      _jsxs("span", {
                        className: "font-bold text-rose-600",
                        children: [fatigueLevel, " / 10"],
                      }),
                    ],
                  }),
                  _jsx("input", {
                    type: "range",
                    min: "1",
                    max: "10",
                    value: fatigueLevel,
                    onChange: (e) => setFatigueLevel(Number(e.target.value)),
                    className: "w-full accent-rose-500",
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsxs("label", {
                    className: "block text-xs font-medium text-slate-700 mb-1",
                    children: [
                      "Stress & Work Pressure: ",
                      _jsxs("span", {
                        className: "font-bold text-rose-600",
                        children: [stressLevel, " / 10"],
                      }),
                    ],
                  }),
                  _jsx("input", {
                    type: "range",
                    min: "1",
                    max: "10",
                    value: stressLevel,
                    onChange: (e) => setStressLevel(Number(e.target.value)),
                    className: "w-full accent-rose-500",
                  }),
                ],
              }),
              _jsxs("div", {
                children: [
                  _jsxs("label", {
                    className: "block text-xs font-medium text-slate-700 mb-1",
                    children: [
                      "Hemoglobin (g/dL): ",
                      _jsx("span", {
                        className: "font-bold text-slate-900",
                        children: hemoglobin,
                      }),
                    ],
                  }),
                  _jsx("input", {
                    type: "number",
                    step: "0.1",
                    min: "7",
                    max: "17",
                    value: hemoglobin,
                    onChange: (e) => setHemoglobin(Number(e.target.value)),
                    className:
                      "w-full px-3 py-1.5 bg-white/80 border border-white rounded-xl text-xs text-slate-900",
                  }),
                ],
              }),
              _jsxs("div", {
                className: "pt-1 space-y-2",
                children: [
                  _jsxs("label", {
                    className:
                      "flex items-center gap-2 text-xs text-slate-700 cursor-pointer",
                    children: [
                      _jsx("input", {
                        type: "checkbox",
                        checked: familyHistoryPCOS,
                        onChange: (e) => setFamilyHistoryPCOS(e.target.checked),
                        className: "rounded text-rose-500",
                      }),
                      _jsx("span", {
                        children: "Family history of PCOS / PCOD",
                      }),
                    ],
                  }),
                  _jsxs("label", {
                    className:
                      "flex items-center gap-2 text-xs text-slate-700 cursor-pointer",
                    children: [
                      _jsx("input", {
                        type: "checkbox",
                        checked: familyHistoryThyroid,
                        onChange: (e) =>
                          setFamilyHistoryThyroid(e.target.checked),
                        className: "rounded text-rose-500",
                      }),
                      _jsx("span", {
                        children: "Family history of Thyroid imbalance",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            className:
              "space-y-3 bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/80 shadow-2xs",
            children: [
              _jsxs("h4", {
                className:
                  "text-xs font-bold text-slate-800 uppercase tracking-wider",
                children: [
                  "3. Selected Symptoms (",
                  selectedSymptoms.length,
                  ")",
                ],
              }),
              _jsx("div", {
                className: "flex flex-wrap gap-1.5 max-h-56 overflow-y-auto",
                children: symptomList.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym);
                  return _jsx(
                    "button",
                    {
                      onClick: () => toggleSymptom(sym),
                      className: `px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-rose-500 text-white shadow-2xs font-semibold"
                          : "bg-white/80 text-slate-700 hover:bg-white border border-white"
                      }`,
                      children: sym,
                    },
                    sym,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
      result &&
        _jsxs("div", {
          className:
            "mt-6 p-6 bg-gradient-to-br from-rose-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl border border-white/80 space-y-5 shadow-2xs",
          children: [
            _jsxs("div", {
              className:
                "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/60 pb-4",
              children: [
                _jsxs("div", {
                  children: [
                    _jsx("span", {
                      className: "text-xs font-bold text-slate-500 uppercase",
                      children: "Assessment Output",
                    }),
                    _jsxs("div", {
                      className: "flex items-center gap-2 mt-0.5",
                      children: [
                        _jsx("h4", {
                          className:
                            "font-serif text-xl font-bold text-slate-900",
                          children: "Predicted Health Vulnerability Index:",
                        }),
                        _jsxs("span", {
                          className: `px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide ${
                            result.riskCategory === "High"
                              ? "bg-red-100/80 text-rose-700 border border-red-200"
                              : result.riskCategory === "Moderate"
                                ? "bg-amber-100/80 text-amber-800 border border-amber-200"
                                : "bg-emerald-100/80 text-emerald-800 border border-emerald-200"
                          }`,
                          children: [
                            result.riskCategory,
                            " Risk (",
                            result.riskScore,
                            "/100)",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                _jsx("div", {
                  className: "text-xs text-slate-600 text-right",
                  children: _jsxs("span", {
                    children: [
                      "Model Confidence: ",
                      _jsxs("strong", {
                        children: [
                          (result.modelConfidence * 100).toFixed(0),
                          "%",
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            _jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              children: result.possibleConditions.map((cond, idx) =>
                _jsxs(
                  "div",
                  {
                    className:
                      "bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/80 shadow-2xs space-y-2.5",
                    children: [
                      _jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          _jsx("h5", {
                            className: "font-bold text-slate-900 text-sm",
                            children: cond.condition,
                          }),
                          _jsxs("span", {
                            className:
                              "text-xs font-mono font-bold text-rose-600 bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-200/50",
                            children: [cond.likelihood, "% Tendency"],
                          }),
                        ],
                      }),
                      _jsx("p", {
                        className: "text-xs text-slate-600 leading-relaxed",
                        children: cond.explanation,
                      }),
                      _jsxs("div", {
                        className: "pt-2 border-t border-white/60",
                        children: [
                          _jsx("span", {
                            className:
                              "text-[11px] font-bold text-slate-700 uppercase",
                            children: "Clinical Actions:",
                          }),
                          _jsx("ul", {
                            className: "mt-1 space-y-1 text-xs text-slate-700",
                            children: cond.recommendedActions.map((act, aIdx) =>
                              _jsxs(
                                "li",
                                {
                                  className: "flex items-start gap-1.5",
                                  children: [
                                    _jsx(CheckCircle2, {
                                      className:
                                        "w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5",
                                    }),
                                    _jsx("span", { children: act }),
                                  ],
                                },
                                aIdx,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ],
                  },
                  idx,
                ),
              ),
            }),
            _jsxs("div", {
              className:
                "bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-white/80 shadow-2xs",
              children: [
                _jsxs("h5", {
                  className:
                    "text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5 mb-2",
                  children: [
                    _jsx(Apple, { className: "w-4 h-4 text-emerald-600" }),
                    " Evidence-Based Lifestyle & Nutrition Protocols",
                  ],
                }),
                _jsx("div", {
                  className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
                  children: result.lifestyleTips.map((tip, tIdx) =>
                    _jsx(
                      "div",
                      {
                        className:
                          "p-2.5 bg-white/80 rounded-xl text-xs text-slate-700 border border-white/60",
                        children: tip,
                      },
                      tIdx,
                    ),
                  ),
                }),
              ],
            }),
            _jsxs("p", {
              className:
                "text-[11px] text-slate-600 italic border-t border-white/60 pt-2",
              children: ["\u26A0\uFE0F ", result.disclaimer],
            }),
          ],
        }),
    ],
  });
};
