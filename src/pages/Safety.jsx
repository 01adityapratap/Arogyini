import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Phone,
  PhoneIncoming,
  PhoneOff,
  UserPlus,
  Trash2,
} from "lucide-react";
import { SOSButton } from "../components/SOSButton.jsx";
import { SafeZoneRadar } from "../components/SafeZoneRadar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";
export const Safety = () => {
  const { user, updateUser, activeSOSEvent, setActiveSOSEvent } = useAuth();
  const [contacts, setContacts] = useState(user?.emergencyContacts || []);
  const [sosHistory, setSosHistory] = useState([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactRelation, setNewContactRelation] = useState("Mother");
  const [isAddingContact, setIsAddingContact] = useState(false);
  // Fake Incoming Call Simulator state
  const [fakeCallActive, setFakeCallActive] = useState(false);
  const [fakeCallAnswered, setFakeCallAnswered] = useState(false);
  const [fakeCallerName, setFakeCallerName] = useState("Mom (Urgent)");
  const [fakeCallTimer, setFakeCallTimer] = useState(0);
  useEffect(() => {
    api
      .getSOSHistory()
      .then((res) => setSosHistory(res.sosHistory))
      .catch(() => {
        console.error("Failed to fetch SOS history");
      });
  }, [activeSOSEvent]);
  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    const newC = {
      id: `ec_${Date.now()}`,
      name: newContactName,
      relation: newContactRelation,
      phone: newContactPhone,
      notifyOnSOS: true,
      priority: contacts.length + 1,
    };
    const updated = [...contacts, newC];
    setContacts(updated);
    await updateUser({ emergencyContacts: updated });
    setNewContactName("");
    setNewContactPhone("");
    setIsAddingContact(false);
  };
  const handleDeleteContact = async (id) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    await updateUser({ emergencyContacts: updated });
  };
  // Fake Call simulation logic
  const triggerFakeCall = () => {
    setFakeCallActive(true);
    setFakeCallAnswered(false);
    setFakeCallTimer(0);
  };
  useEffect(() => {
    let interval = null;
    if (fakeCallAnswered) {
      interval = setInterval(() => {
        setFakeCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fakeCallAnswered]);
  return _jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
    children: [
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-rose-500/15 via-red-500/10 to-amber-500/10 border border-white/80",
        children: [
          _jsxs("div", {
            className: "space-y-2 relative z-10",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider text-rose-700 border border-white",
                children: [
                  _jsx(ShieldAlert, { className: "w-3.5 h-3.5 text-rose-500" }),
                  _jsx("span", {
                    children:
                      "Pillar 4 \u2022 Real-Time Safety & Emergency Dispatch",
                  }),
                ],
              }),
              _jsx("h1", {
                className:
                  "font-serif text-2xl sm:text-4xl font-bold text-slate-900",
                children: "Emergency SOS Command Center",
              }),
              _jsx("p", {
                className: "text-xs sm:text-sm text-slate-600 max-w-xl",
                children:
                  "Transmit live GPS distress coordinates instantly to registered guardians and police control rooms (112 / 1091).",
              }),
            ],
          }),
          _jsx("div", {
            className: "flex flex-wrap gap-2.5 shrink-0 relative z-10",
            children: _jsxs("button", {
              onClick: triggerFakeCall,
              className:
                "px-5 py-2.5 bg-white/70 hover:bg-white/90 backdrop-blur-md text-slate-800 font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-xs border border-white/80 cursor-pointer",
              children: [
                _jsx(PhoneIncoming, {
                  className: "w-4 h-4 text-emerald-600 animate-bounce",
                }),
                _jsx("span", { children: "Trigger Fake Incoming Call" }),
              ],
            }),
          }),
        ],
      }),
      _jsx(SOSButton, { variant: "card" }),
      _jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
        children: [
          _jsxs("div", {
            className: "lg:col-span-6 space-y-6",
            children: [
              _jsxs("div", {
                className:
                  "glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 border border-white/80",
                children: [
                  _jsxs("div", {
                    className:
                      "flex items-center justify-between border-b border-white/60 pb-3",
                    children: [
                      _jsxs("div", {
                        children: [
                          _jsx("h3", {
                            className:
                              "font-serif text-xl font-bold text-slate-900",
                            children: "Emergency Guardians",
                          }),
                          _jsx("p", {
                            className: "text-xs text-slate-500",
                            children:
                              "Auto-notified with your live GPS location upon SOS trigger",
                          }),
                        ],
                      }),
                      _jsxs("button", {
                        onClick: () => setIsAddingContact(!isAddingContact),
                        className:
                          "px-3.5 py-1.5 bg-rose-100/80 hover:bg-rose-200/80 text-rose-700 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer transition-all border border-rose-200/60",
                        children: [
                          _jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                          _jsx("span", { children: "Add Guardian" }),
                        ],
                      }),
                    ],
                  }),
                  isAddingContact &&
                    _jsxs("form", {
                      onSubmit: handleAddContact,
                      className:
                        "p-4 bg-rose-50/80 backdrop-blur-xs border border-rose-200/80 rounded-2xl space-y-3 shadow-2xs",
                      children: [
                        _jsxs("div", {
                          className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
                          children: [
                            _jsx("input", {
                              type: "text",
                              required: true,
                              value: newContactName,
                              onChange: (e) =>
                                setNewContactName(e.target.value),
                              placeholder: "Guardian Name (e.g. Sister)",
                              className:
                                "w-full px-3 py-2 bg-white/90 border border-white rounded-xl text-xs text-slate-900",
                            }),
                            _jsx("input", {
                              type: "tel",
                              required: true,
                              value: newContactPhone,
                              onChange: (e) =>
                                setNewContactPhone(e.target.value),
                              placeholder: "Mobile Number (+91...)",
                              className:
                                "w-full px-3 py-2 bg-white/90 border border-white rounded-xl text-xs text-slate-900",
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          className: "flex justify-end gap-2",
                          children: [
                            _jsx("button", {
                              type: "button",
                              onClick: () => setIsAddingContact(false),
                              className:
                                "px-3 py-1.5 bg-slate-200/80 text-slate-700 rounded-full text-xs font-semibold cursor-pointer",
                              children: "Cancel",
                            }),
                            _jsx("button", {
                              type: "submit",
                              className:
                                "px-4 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-bold cursor-pointer shadow-sm shadow-rose-200",
                              children: "Save Guardian",
                            }),
                          ],
                        }),
                      ],
                    }),
                  _jsx("div", {
                    className: "space-y-2.5",
                    children: contacts.map((c) =>
                      _jsxs(
                        "div",
                        {
                          className:
                            "p-3.5 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 flex items-center justify-between gap-3 text-xs shadow-2xs",
                          children: [
                            _jsxs("div", {
                              className: "flex items-center gap-3",
                              children: [
                                _jsx("div", {
                                  className:
                                    "w-8 h-8 rounded-full bg-rose-100/80 text-rose-700 flex items-center justify-center font-bold border border-rose-200/50",
                                  children: c.name.charAt(0),
                                }),
                                _jsxs("div", {
                                  children: [
                                    _jsx("p", {
                                      className: "font-bold text-slate-900",
                                      children: c.name,
                                    }),
                                    _jsxs("p", {
                                      className:
                                        "text-slate-500 font-mono text-[11px]",
                                      children: [
                                        c.phone,
                                        " \u2022 ",
                                        c.relation,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            _jsxs("div", {
                              className: "flex items-center gap-2",
                              children: [
                                _jsx("span", {
                                  className:
                                    "bg-emerald-100/80 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200/50",
                                  children: "SOS Active",
                                }),
                                _jsx("button", {
                                  onClick: () => handleDeleteContact(c.id),
                                  className:
                                    "p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer",
                                  children: _jsx(Trash2, {
                                    className: "w-3.5 h-3.5",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        },
                        c.id,
                      ),
                    ),
                  }),
                ],
              }),
              _jsxs("div", {
                className:
                  "glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 border border-white/80",
                children: [
                  _jsxs("div", {
                    className:
                      "flex items-center gap-2 text-teal-700 font-bold text-xs uppercase",
                    children: [
                      _jsx(PhoneIncoming, {
                        className: "w-4 h-4 text-teal-600",
                      }),
                      _jsx("span", {
                        children: "Discrete Safe Exit Tool: Fake Incoming Call",
                      }),
                    ],
                  }),
                  _jsx("p", {
                    className: "text-xs text-slate-600 leading-relaxed",
                    children:
                      "If you feel uneasy in an uncomfortable social setting or cab ride, simulate an urgent incoming phone call to provide an excuse to leave safely.",
                  }),
                  _jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      _jsx("input", {
                        type: "text",
                        value: fakeCallerName,
                        onChange: (e) => setFakeCallerName(e.target.value),
                        placeholder: "Caller ID (e.g. Dad / Manager)",
                        className:
                          "flex-1 px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-xs text-slate-900 shadow-2xs",
                      }),
                      _jsxs("button", {
                        onClick: triggerFakeCall,
                        className:
                          "px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md shadow-teal-200",
                        children: [
                          _jsx(PhoneIncoming, { className: "w-3.5 h-3.5" }),
                          _jsx("span", { children: "Simulate Call" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _jsx("div", {
            className: "lg:col-span-6 space-y-6",
            children: _jsx(SafeZoneRadar, {}),
          }),
        ],
      }),
      fakeCallActive &&
        _jsx("div", {
          className:
            "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md",
          children: _jsx("div", {
            className:
              "bg-slate-900/90 backdrop-blur-2xl text-white rounded-3xl max-w-sm w-full p-8 text-center space-y-8 shadow-2xl border border-slate-700/60 animate-pulse",
            children: !fakeCallAnswered
              ? _jsxs("div", {
                  className: "space-y-6",
                  children: [
                    _jsx("div", {
                      className:
                        "w-24 h-24 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-lg shadow-emerald-500/30",
                      children: _jsx(PhoneIncoming, {
                        className: "w-10 h-10 text-emerald-400 animate-bounce",
                      }),
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("span", {
                          className:
                            "text-xs uppercase tracking-widest text-slate-400",
                          children: "Incoming Cellular Call",
                        }),
                        _jsx("h3", {
                          className:
                            "font-serif text-2xl font-bold text-white mt-1",
                          children: fakeCallerName,
                        }),
                        _jsx("p", {
                          className: "text-xs text-slate-400 mt-1",
                          children: "Mobile +91 98450 11223",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className: "flex justify-center gap-8 pt-4",
                      children: [
                        _jsx("button", {
                          onClick: () => setFakeCallActive(false),
                          className:
                            "w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center text-white shadow-lg cursor-pointer transition-all hover:scale-105",
                          children: _jsx(PhoneOff, { className: "w-6 h-6" }),
                        }),
                        _jsx("button", {
                          onClick: () => setFakeCallAnswered(true),
                          className:
                            "w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white shadow-lg cursor-pointer animate-bounce transition-all hover:scale-105",
                          children: _jsx(Phone, { className: "w-6 h-6" }),
                        }),
                      ],
                    }),
                  ],
                })
              : _jsxs("div", {
                  className: "space-y-6",
                  children: [
                    _jsx("div", {
                      className:
                        "w-20 h-20 rounded-full bg-emerald-950/80 mx-auto flex items-center justify-center border border-emerald-500 shadow-md",
                      children: _jsx(Phone, {
                        className: "w-8 h-8 text-emerald-400",
                      }),
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("h3", {
                          className: "font-serif text-xl font-bold text-white",
                          children: fakeCallerName,
                        }),
                        _jsxs("p", {
                          className: "text-xs font-mono text-emerald-400 mt-1",
                          children: [
                            "Call Connected: ",
                            Math.floor(fakeCallTimer / 60),
                            ":",
                            (fakeCallTimer % 60).toString().padStart(2, "0"),
                          ],
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "p-3.5 bg-slate-800/80 rounded-2xl text-xs text-slate-300 text-left space-y-1 border border-slate-700/60",
                      children: [
                        _jsx("p", {
                          className: "font-bold text-emerald-400",
                          children: "Audio Simulation Prompt:",
                        }),
                        _jsx("p", {
                          className: "text-[11px] italic",
                          children:
                            '"Hey, are you still at the venue? We\'ve arrived outside to pick you up right now."',
                        }),
                      ],
                    }),
                    _jsxs("button", {
                      onClick: () => setFakeCallActive(false),
                      className:
                        "w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-rose-900/40",
                      children: [
                        _jsx(PhoneOff, { className: "w-4 h-4" }),
                        _jsx("span", { children: "End Call & Return" }),
                      ],
                    }),
                  ],
                }),
          }),
        }),
    ],
  });
};
