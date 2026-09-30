import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { CheckCircle2, Save, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
export const Profile = ({ setActiveTab }) => {
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || "B+");
  const [city, setCity] = useState(user?.location?.city || "Bengaluru");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUser({
        name,
        phone,
        bloodGroup,
        location: {
          ...user?.location,
          city,
        },
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };
  return _jsx("div", {
    className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
    children: _jsxs("div", {
      className:
        "glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-sm space-y-6",
      children: [
        _jsxs("div", {
          className:
            "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/60 pb-6",
          children: [
            _jsxs("div", {
              className: "flex items-center gap-4",
              children: [
                _jsx("div", {
                  className:
                    "w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white font-serif font-bold text-2xl flex items-center justify-center shadow-md",
                  children: name.charAt(0) || "A",
                }),
                _jsxs("div", {
                  children: [
                    _jsx("h2", {
                      className: "font-serif text-2xl font-bold text-slate-900",
                      children: name || "User Profile",
                    }),
                    _jsxs("p", {
                      className: "text-xs sm:text-sm text-slate-500",
                      children: [
                        user?.email,
                        " \u2022 Confidential User Profile",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            _jsxs("button", {
              onClick: () => {
                logout();
                setActiveTab("home");
              },
              className:
                "px-4 py-2 bg-white/70 hover:bg-white/90 text-slate-700 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer w-fit border border-white/80 shadow-2xs transition-all",
              children: [
                _jsx(LogOut, { className: "w-4 h-4" }),
                _jsx("span", { children: "Sign Out" }),
              ],
            }),
          ],
        }),
        savedSuccess &&
          _jsxs("div", {
            className:
              "p-3 bg-emerald-100/80 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-2xs",
            children: [
              _jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600" }),
              _jsx("span", {
                children: "Profile information updated securely.",
              }),
            ],
          }),
        _jsxs("form", {
          onSubmit: handleSave,
          className: "space-y-4",
          children: [
            _jsxs("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
              children: [
                _jsxs("div", {
                  children: [
                    _jsx("label", {
                      className:
                        "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                      children: "Full Name",
                    }),
                    _jsx("input", {
                      type: "text",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      className:
                        "w-full px-3.5 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs",
                    }),
                  ],
                }),
                _jsxs("div", {
                  children: [
                    _jsx("label", {
                      className:
                        "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                      children: "Primary Mobile",
                    }),
                    _jsx("input", {
                      type: "tel",
                      value: phone,
                      onChange: (e) => setPhone(e.target.value),
                      className:
                        "w-full px-3.5 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs",
                    }),
                  ],
                }),
                _jsxs("div", {
                  children: [
                    _jsx("label", {
                      className:
                        "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                      children: "Blood Group (Emergency)",
                    }),
                    _jsx("select", {
                      value: bloodGroup,
                      onChange: (e) => setBloodGroup(e.target.value),
                      className:
                        "w-full px-3.5 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs",
                      children: [
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "O+",
                        "O-",
                        "AB+",
                        "AB-",
                      ].map((bg) =>
                        _jsx("option", { value: bg, children: bg }, bg),
                      ),
                    }),
                  ],
                }),
                _jsxs("div", {
                  children: [
                    _jsx("label", {
                      className:
                        "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                      children: "Default City",
                    }),
                    _jsx("input", {
                      type: "text",
                      value: city,
                      onChange: (e) => setCity(e.target.value),
                      className:
                        "w-full px-3.5 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs",
                    }),
                  ],
                }),
              ],
            }),
            _jsx("div", {
              className: "pt-4 flex justify-end",
              children: _jsxs("button", {
                type: "submit",
                disabled: saving,
                className:
                  "px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold shadow-md shadow-rose-200 flex items-center gap-2 cursor-pointer transition-all",
                children: [
                  _jsx(Save, { className: "w-4 h-4" }),
                  _jsx("span", {
                    children: saving ? "Saving..." : "Save Profile Changes",
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    }),
  });
};
