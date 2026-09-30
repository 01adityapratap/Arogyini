import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Shield, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
export const Register = ({ setActiveTab }) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("B+");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    try {
      await register({
        name,
        email,
        phone,
        bloodGroup,
        emergencyContacts: guardianName
          ? [
              {
                id: "ec_reg_1",
                name: guardianName,
                relation: "Guardian",
                phone: guardianPhone || "+91 98111 22334",
                notifyOnSOS: true,
                priority: 1,
              },
            ]
          : [],
      });
      setActiveTab("dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return _jsxs("div", {
    className: "max-w-lg mx-auto px-4 py-10 space-y-6",
    children: [
      _jsxs("div", {
        className: "text-center space-y-2",
        children: [
          _jsx("h2", {
            className: "font-serif text-3xl font-bold text-slate-900",
            children: "Create Your Arogyini Account",
          }),
          _jsx("p", {
            className: "text-xs sm:text-sm text-slate-600",
            children:
              "Set up your private profile and emergency SOS guardian contacts.",
          }),
        ],
      }),
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-sm",
        children: [
          _jsxs("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
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
                    required: true,
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: "e.g. Ananya Rao",
                    className:
                      "w-full px-3.5 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs",
                  }),
                ],
              }),
              _jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                children: [
                  _jsxs("div", {
                    children: [
                      _jsx("label", {
                        className:
                          "block text-xs font-bold text-slate-700 uppercase mb-1.5",
                        children: "Email Address",
                      }),
                      _jsx("input", {
                        type: "email",
                        required: true,
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: "ananya@example.com",
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
                        children: "Phone Number",
                      }),
                      _jsx("input", {
                        type: "tel",
                        value: phone,
                        onChange: (e) => setPhone(e.target.value),
                        placeholder: "+91 98765 00000",
                        className:
                          "w-full px-3.5 py-2.5 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-sm text-slate-900 shadow-2xs",
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
                    children: "Blood Group",
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
                className:
                  "p-4 bg-rose-50/80 backdrop-blur-xs border border-rose-200/80 rounded-2xl space-y-3 shadow-2xs",
                children: [
                  _jsxs("div", {
                    className:
                      "flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider",
                    children: [
                      _jsx(Shield, { className: "w-4 h-4 text-rose-600" }),
                      _jsx("span", { children: "Primary Emergency Guardian" }),
                    ],
                  }),
                  _jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
                    children: [
                      _jsx("input", {
                        type: "text",
                        value: guardianName,
                        onChange: (e) => setGuardianName(e.target.value),
                        placeholder: "Guardian / Mother Name",
                        className:
                          "w-full px-3 py-2 bg-white/90 border border-white rounded-xl text-xs text-slate-900",
                      }),
                      _jsx("input", {
                        type: "tel",
                        value: guardianPhone,
                        onChange: (e) => setGuardianPhone(e.target.value),
                        placeholder: "Guardian Phone (+91...)",
                        className:
                          "w-full px-3 py-2 bg-white/90 border border-white rounded-xl text-xs text-slate-900",
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
                      ? "Creating Account..."
                      : "Complete Registration",
                  }),
                  _jsx(ArrowRight, { className: "w-4 h-4" }),
                ],
              }),
            ],
          }),
          _jsxs("div", {
            className: "pt-4 text-center text-xs text-slate-600",
            children: [
              _jsx("span", { children: "Already registered? " }),
              _jsx("button", {
                onClick: () => setActiveTab("login"),
                className:
                  "text-rose-600 font-bold hover:underline cursor-pointer",
                children: "Log in here",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
