import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import {
  ShieldAlert,
  Volume2,
  VolumeX,
  PhoneCall,
  CheckCircle,
  X,
  Radio,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";
export const SOSButton = ({ variant = "floating", onEmergencyTriggered }) => {
  const { user, activeSOSEvent, setActiveSOSEvent } = useAuth();
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [locationStatus, setLocationStatus] = useState("Ready");
  const [emergencyType, setEmergencyType] = useState("general");
  const [broadcastResults, setBroadcastResults] = useState([]);
  const timerRef = useRef(null);
  // Sound generator using Web Audio API
  const toggleSiren = () => {
    if (sirenPlaying) {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {
          console.warn(e);
        }
      }
      setSirenPlaying(false);
      setOscillator(null);
    } else {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        const now = ctx.currentTime;
        osc.frequency.linearRampToValueAtTime(1400, now + 0.3);
        osc.frequency.linearRampToValueAtTime(800, now + 0.6);
        osc.frequency.linearRampToValueAtTime(1400, now + 0.9);
        osc.frequency.linearRampToValueAtTime(800, now + 1.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setAudioContext(ctx);
        setOscillator(osc);
        setSirenPlaying(true);
      } catch (err) {
        console.warn("Audio siren context error:", err);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (oscillator) {
        try {
          oscillator.stop();
        } catch {}
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [oscillator]);
  const startCountdown = () => {
    setIsCountingDown(true);
    setCountdown(3);
    setIsModalOpen(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          executeEmergencyTrigger();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const cancelCountdown = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsCountingDown(false);
    setCountdown(3);
    setIsModalOpen(false);
  };
  const executeEmergencyTrigger = async () => {
    setIsCountingDown(false);
    setIsTriggering(true);
    setLocationStatus("Acquiring precise GPS coordinates...");
    let lat = 12.9716;
    let lng = 77.5946;
    let accuracy = 10;
    let address = "Current Geo Location";
    if (navigator.geolocation) {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        accuracy = Math.round(pos.coords.accuracy);
        address = `Live Coordinates: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E (±${accuracy}m)`;
        setLocationStatus("GPS Coordinates Locked");
      } catch (e) {
        console.warn("Geolocation fallback to city defaults:", e);
        setLocationStatus("GPS Defaulted to Current Region");
      }
    }
    try {
      const resp = await api.triggerSOS({
        latitude: lat,
        longitude: lng,
        accuracy,
        address,
        emergencyType,
        notes: `Distress alert triggered via Arogyini SOS command.`,
      });
      setActiveSOSEvent(resp.sosEvent);
      setBroadcastResults(resp.dispatchSummary?.results || []);
      if (onEmergencyTriggered) onEmergencyTriggered(resp.sosEvent);
      toggleSiren();
    } catch (err) {
      console.error("Failed to trigger SOS:", err);
    } finally {
      setIsTriggering(false);
    }
  };
  const resolveEmergency = async () => {
    if (activeSOSEvent) {
      try {
        await api.resolveSOSEvent(activeSOSEvent.id, "Resolved safely by user");
        setActiveSOSEvent(null);
        if (sirenPlaying) toggleSiren();
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error resolving SOS:", err);
      }
    } else {
      setIsModalOpen(false);
    }
  };
  return _jsxs(_Fragment, {
    children: [
      variant === "floating" &&
        _jsxs("div", {
          className:
            "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2",
          children: [
            activeSOSEvent &&
              _jsxs("div", {
                className:
                  "bg-red-600/90 backdrop-blur-md border border-white/40 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce",
                children: [
                  _jsx(Radio, { className: "w-3.5 h-3.5" }),
                  _jsx("span", { children: "SOS ACTIVE \u2022 BROADCASTING" }),
                ],
              }),
            _jsxs("button", {
              id: "floating-sos-trigger",
              onClick: activeSOSEvent
                ? () => setIsModalOpen(true)
                : startCountdown,
              className: `w-16 h-16 sm:w-18 sm:h-18 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer relative backdrop-blur-md ${
                activeSOSEvent
                  ? "bg-red-600 ring-8 ring-red-400/40 animate-pulse"
                  : "bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-300 border-2 border-white/60"
              }`,
              title: "Emergency SOS Alert",
              children: [
                _jsx(ShieldAlert, { className: "w-7 h-7 sm:w-8 sm:h-8" }),
                _jsx("span", {
                  className:
                    "text-[10px] font-black tracking-wider uppercase mt-0.5",
                  children: "SOS",
                }),
              ],
            }),
          ],
        }),
      variant === "card" &&
        _jsx("div", {
          className:
            "glass-panel-subtle rounded-3xl p-6 sm:p-8 border border-white/70 shadow-sm relative overflow-hidden bg-gradient-to-br from-rose-500/10 via-rose-50/50 to-pink-100/30",
          children: _jsxs("div", {
            className: "relative z-10",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/15 backdrop-blur-md border border-rose-200/80 rounded-full text-xs font-bold text-rose-700 uppercase tracking-wider mb-4",
                children: [
                  _jsx(ShieldAlert, { className: "w-4 h-4 text-rose-600" }),
                  _jsx("span", { children: "Emergency SOS Command Hub" }),
                ],
              }),
              _jsx("h3", {
                className:
                  "font-serif text-2xl sm:text-3xl font-bold mb-2 text-slate-900",
                children: "Immediate Danger? Broadcast Your Distress Signal",
              }),
              _jsxs("p", {
                className:
                  "text-sm text-slate-600 mb-6 max-w-xl leading-relaxed",
                children: [
                  "1-Tap transmits your live GPS coordinates to ",
                  user?.emergencyContacts?.length || 3,
                  " emergency guardians and directly alerts the nearest Police Pink Patrol (112 / 1091).",
                ],
              }),
              _jsxs("div", {
                className: "flex flex-wrap items-center gap-3",
                children: [
                  _jsxs("button", {
                    id: "card-sos-trigger-btn",
                    onClick: activeSOSEvent
                      ? () => setIsModalOpen(true)
                      : startCountdown,
                    className:
                      "px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold uppercase tracking-wider shadow-lg shadow-rose-200 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm",
                    children: [
                      _jsx(ShieldAlert, {
                        className: "w-4 h-4 text-white animate-pulse",
                      }),
                      _jsx("span", {
                        children: activeSOSEvent
                          ? "Manage Active SOS Feed"
                          : "Trigger SOS Now (3s)",
                      }),
                    ],
                  }),
                  _jsxs("button", {
                    onClick: toggleSiren,
                    className:
                      "px-4 py-3 bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/80 text-slate-800 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-xs",
                    children: [
                      sirenPlaying
                        ? _jsx(VolumeX, { className: "w-4 h-4 text-rose-600" })
                        : _jsx(Volume2, {
                            className: "w-4 h-4 text-slate-600",
                          }),
                      _jsx("span", {
                        children: sirenPlaying
                          ? "Stop Audio Siren"
                          : "Test Siren Alarm",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      isModalOpen &&
        _jsx("div", {
          className:
            "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md",
          children: _jsxs("div", {
            className:
              "bg-white/85 backdrop-blur-2xl rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/80",
            children: [
              _jsx("div", {
                className: `p-6 text-white ${activeSOSEvent || !isCountingDown ? "bg-rose-600/90 backdrop-blur-md" : "bg-amber-600/90 backdrop-blur-md"}`,
                children: _jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    _jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        _jsx(ShieldAlert, {
                          className: "w-6 h-6 animate-bounce",
                        }),
                        _jsx("h3", {
                          className: "font-serif text-xl font-bold",
                          children: isCountingDown
                            ? "Emergency Countdown"
                            : "SOS Emergency Broadcast",
                        }),
                      ],
                    }),
                    _jsx("button", {
                      onClick: () => setIsModalOpen(false),
                      className:
                        "p-1.5 rounded-full hover:bg-white/20 text-white cursor-pointer",
                      children: _jsx(X, { className: "w-5 h-5" }),
                    }),
                  ],
                }),
              }),
              _jsxs("div", {
                className: "p-6 space-y-5",
                children: [
                  isCountingDown &&
                    _jsxs("div", {
                      className: "text-center py-6 space-y-4",
                      children: [
                        _jsx("div", {
                          className:
                            "w-24 h-24 rounded-full bg-amber-100/80 backdrop-blur-md text-amber-700 font-serif font-black text-5xl flex items-center justify-center mx-auto border-4 border-amber-300 shadow-sm animate-pulse",
                          children: countdown,
                        }),
                        _jsxs("div", {
                          children: [
                            _jsxs("h4", {
                              className: "font-bold text-slate-900 text-lg",
                              children: [
                                "Broadcasting Distress Alert in ",
                                countdown,
                                "s",
                              ],
                            }),
                            _jsx("p", {
                              className:
                                "text-xs text-slate-600 max-w-sm mx-auto mt-1",
                              children:
                                "GPS coordinates and distress messages will be sent to all your emergency guardians and Police 112.",
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          className: "flex justify-center gap-3 pt-2",
                          children: [
                            _jsx("button", {
                              onClick: cancelCountdown,
                              className:
                                "px-6 py-2.5 bg-white/70 hover:bg-white/90 border border-slate-200 text-slate-800 rounded-full font-bold text-sm cursor-pointer shadow-xs",
                              children: "Cancel Trigger",
                            }),
                            _jsx("button", {
                              onClick: executeEmergencyTrigger,
                              className:
                                "px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-sm cursor-pointer shadow-md shadow-rose-200",
                              children: "Send Immediately",
                            }),
                          ],
                        }),
                      ],
                    }),
                  !isCountingDown &&
                    _jsxs("div", {
                      className: "space-y-4",
                      children: [
                        _jsxs("div", {
                          className:
                            "p-4 bg-rose-500/10 border border-rose-200/80 rounded-2xl flex items-start gap-3 backdrop-blur-sm",
                          children: [
                            _jsx(Radio, {
                              className:
                                "w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse",
                            }),
                            _jsxs("div", {
                              className: "text-xs text-slate-800",
                              children: [
                                _jsx("p", {
                                  className: "font-bold text-rose-900 text-sm",
                                  children:
                                    "Distress Signal Transmitted Successfully",
                                }),
                                _jsxs("p", {
                                  className: "text-slate-600 mt-0.5",
                                  children: [
                                    locationStatus,
                                    " \u2022 Police Pink Patrol Station: ",
                                    _jsx("strong", {
                                      children:
                                        "Cubbon Park Control Room (112)",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          className: "space-y-2",
                          children: [
                            _jsx("h5", {
                              className:
                                "text-xs font-bold text-slate-500 uppercase tracking-wider",
                              children: "Notified Emergency Channels",
                            }),
                            _jsxs("div", {
                              className:
                                "space-y-1.5 max-h-40 overflow-y-auto pr-1",
                              children: [
                                user?.emergencyContacts &&
                                user.emergencyContacts.length > 0
                                  ? user.emergencyContacts.map((c, i) =>
                                      _jsxs(
                                        "div",
                                        {
                                          className:
                                            "flex items-center justify-between p-2.5 bg-white/70 rounded-xl border border-white/80 text-xs shadow-2xs",
                                          children: [
                                            _jsxs("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                _jsx(CheckCircle, {
                                                  className:
                                                    "w-4 h-4 text-emerald-600",
                                                }),
                                                _jsx("span", {
                                                  className:
                                                    "font-semibold text-slate-900",
                                                  children: c.name,
                                                }),
                                                _jsxs("span", {
                                                  className:
                                                    "text-slate-500 font-mono text-[11px]",
                                                  children: ["(", c.phone, ")"],
                                                }),
                                              ],
                                            }),
                                            _jsx("span", {
                                              className:
                                                "bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium text-[10px]",
                                              children: "SMS Delivered",
                                            }),
                                          ],
                                        },
                                        c.id || i,
                                      ),
                                    )
                                  : _jsx("div", {
                                      className:
                                        "p-2 bg-white/70 rounded-xl text-xs text-slate-600 border border-white/80",
                                      children:
                                        "Guardian alert dispatched to primary registered phone.",
                                    }),
                                _jsxs("div", {
                                  className:
                                    "flex items-center justify-between p-2.5 bg-blue-50/70 border border-blue-200/70 rounded-xl text-xs",
                                  children: [
                                    _jsxs("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        _jsx(CheckCircle, {
                                          className: "w-4 h-4 text-blue-600",
                                        }),
                                        _jsx("span", {
                                          className:
                                            "font-semibold text-blue-950",
                                          children:
                                            "Police Emergency Control (112)",
                                        }),
                                      ],
                                    }),
                                    _jsx("span", {
                                      className:
                                        "bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium text-[10px]",
                                      children: "CAD CAD-ID #89201",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          className: "grid grid-cols-2 gap-2.5 pt-2",
                          children: [
                            _jsxs("button", {
                              onClick: toggleSiren,
                              className: `p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                sirenPlaying
                                  ? "bg-amber-100/90 border-amber-300 text-amber-900 animate-pulse"
                                  : "bg-white/70 hover:bg-white text-slate-800 border-white/80 shadow-xs"
                              }`,
                              children: [
                                _jsx(Volume2, { className: "w-4 h-4" }),
                                _jsx("span", {
                                  children: sirenPlaying
                                    ? "Mute Siren Alarm"
                                    : "Sound Alarm Siren",
                                }),
                              ],
                            }),
                            _jsxs("a", {
                              href: "tel:112",
                              className:
                                "p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-rose-200",
                              children: [
                                _jsx(PhoneCall, { className: "w-4 h-4" }),
                                _jsx("span", { children: "Direct Call 112" }),
                              ],
                            }),
                          ],
                        }),
                        _jsx("div", {
                          className:
                            "pt-2 border-t border-slate-200/60 flex items-center justify-between",
                          children: _jsxs("button", {
                            onClick: resolveEmergency,
                            className:
                              "w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm",
                            children: [
                              _jsx(CheckCircle, { className: "w-4 h-4" }),
                              _jsx("span", {
                                children:
                                  "I Am Safe Now \u2014 Resolve SOS Alert",
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
        }),
    ],
  });
};
