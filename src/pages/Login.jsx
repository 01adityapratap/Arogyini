import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Lock, Mail, ArrowRight, Sparkles, UserCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
export const Login = ({ setActiveTab }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const demoAccounts = [
    {
      name: "Aanya Sharma",
      role: "Student / Tech Aspirant",
      email: "aanya@example.com",
      avatar: "👩‍💻",
    },
    {
      name: "Adv. Priya Deshmukh",
      role: "Legal Rights Counselor",
      email: "priya.legal@example.com",
      avatar: "⚖️",
    },
    {
      name: "Dr. Meera Sen",
      role: "Gynecological Care Advisor",
      email: "meera.health@example.com",
      avatar: "🩺",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      await login(email);
      setActiveTab("dashboard");
    } catch (err) {
      setError("Unable to authenticate. Please check details.");
    } finally {
      setLoading(false);
    }
  };
  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail);
    setLoading(true);
    try {
      await login(demoEmail);
      setActiveTab("dashboard");
    } finally {
      setLoading(false);
    }
  };
  return _jsxs("div", {
    className: "max-w-md mx-auto px-4 py-12 space-y-8",
    children: [
      _jsxs("div", {
        className: "text-center space-y-2",
        children: [
          _jsx("div", {
            className:
              "w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white font-serif font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-rose-200",
            children: "\u0905",
          }),
          _jsx("h2", {
            className:
              "font-serif text-2xl sm:text-3xl font-bold text-slate-900",
            children: "Welcome to AROGYINI",
          }),
          _jsx("p", {
            className: "text-xs sm:text-sm text-slate-600",
            children:
              "Access your secure health profile, legal grievance logs, and emergency contacts.",
          }),
        ],
      }),
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-sm space-y-6",
        children: [
          error &&
            _jsx("div", {
              className:
                "p-3 bg-red-500/10 border border-red-200 text-rose-700 rounded-2xl text-xs font-medium backdrop-blur-xs",
              children: error,
            }),
          _jsxs("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
            children: [
              _jsxs("div", {
                children: [
                  _jsx("label", {
                    className:
                      "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                    children: "Email Address",
                  }),
                  _jsxs("div", {
                    className: "relative",
                    children: [
                      _jsx(Mail, {
                        className:
                          "w-4 h-4 text-slate-400 absolute left-3.5 top-3",
                      }),
                      _jsx("input", {
                        type: "email",
                        required: true,
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: "name@example.com",
                        className:
                          "w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs focus:bg-white focus:ring-2 focus:ring-rose-500",
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
                    children: "Password",
                  }),
                  _jsxs("div", {
                    className: "relative",
                    children: [
                      _jsx(Lock, {
                        className:
                          "w-4 h-4 text-slate-400 absolute left-3.5 top-3",
                      }),
                      _jsx("input", {
                        type: "password",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder:
                          "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                        className:
                          "w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs focus:bg-white focus:ring-2 focus:ring-rose-500",
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("button", {
                type: "submit",
                disabled: loading,
                className:
                  "w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm font-bold shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 cursor-pointer",
                children: [
                  _jsx("span", {
                    children: loading
                      ? "Authenticating..."
                      : "Sign In Securely",
                  }),
                  _jsx(ArrowRight, { className: "w-4 h-4" }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            className: "pt-2 text-center text-xs text-slate-600",
            children: [
              _jsx("span", { children: "Don't have an account yet? " }),
              _jsx("button", {
                onClick: () => setActiveTab("register"),
                className:
                  "text-rose-600 font-bold hover:underline cursor-pointer",
                children: "Create an Account",
              }),
            ],
          }),
          _jsxs("div", {
            className: "pt-4 border-t border-white/60 space-y-3",
            children: [
              _jsxs("span", {
                className:
                  "text-[11px] font-bold text-slate-700 uppercase flex items-center gap-1",
                children: [
                  _jsx(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }),
                  " Instant Demo Personas",
                ],
              }),
              _jsx("div", {
                className: "space-y-2",
                children: demoAccounts.map((demo) =>
                  _jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDemoLogin(demo.email),
                      className:
                        "w-full p-2.5 bg-white/60 hover:bg-white/90 backdrop-blur-sm border border-white/80 rounded-2xl text-left flex items-center justify-between transition-all cursor-pointer shadow-2xs",
                      children: [
                        _jsxs("div", {
                          className: "flex items-center gap-2.5",
                          children: [
                            _jsx("span", {
                              className: "text-lg",
                              children: demo.avatar,
                            }),
                            _jsxs("div", {
                              children: [
                                _jsx("p", {
                                  className: "text-xs font-bold text-slate-900",
                                  children: demo.name,
                                }),
                                _jsx("p", {
                                  className: "text-[10px] text-slate-600",
                                  children: demo.role,
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsx(UserCheck, {
                          className: "w-4 h-4 text-slate-400",
                        }),
                      ],
                    },
                    demo.email,
                  ),
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
