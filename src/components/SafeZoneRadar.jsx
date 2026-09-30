import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { Shield, MapPin, Phone, Navigation, Star, Clock } from "lucide-react";
import { api } from "../services/api.js";
export const SafeZoneRadar = () => {
  const [safeZones, setSafeZones] = useState([]);
  const [filter, setFilter] = useState("all");
  const [routeAudit, setRouteAudit] = useState(null);
  const [loadingAudit, setLoadingAudit] = useState(false);
  useEffect(() => {
    api
      .getSafeZones()
      .then((res) => setSafeZones(res.safeZones))
      .catch(() => {});
    runRouteAudit();
  }, []);
  const runRouteAudit = async () => {
    setLoadingAudit(true);
    try {
      const data = await api.auditSafetyRoute(12.9716, 77.5946);
      setRouteAudit(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoadingAudit(false);
    }
  };
  const filteredZones = safeZones.filter((z) => {
    if (filter === "all") return true;
    if (filter === "pink_booth") return z.type === "pink_booth";
    if (filter === "hospital") return z.type === "hospital";
    if (filter === "womens_shelter") return z.type === "womens_shelter";
    return true;
  });
  return _jsxs("div", {
    className:
      "glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-sm space-y-6",
    children: [
      _jsxs("div", {
        className: "space-y-4",
        children: [
          _jsxs("div", {
            className: "space-y-2",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100/80 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200/60 backdrop-blur-xs",
                children: [
                  _jsx(Shield, { className: "w-4 h-4 text-emerald-600" }),
                  _jsx("span", { children: "Geo-Verified Safety Radar" }),
                ],
              }),
              _jsx("h3", {
                className:
                  "font-serif text-2xl font-bold text-slate-900 leading-tight",
                children: "24x7 Safe Havens, Pink Booths & Medical Centers",
              }),
            ],
          }),
          _jsx("div", {
            className: "flex flex-wrap gap-1.5",
            children: [
              { id: "all", label: "All Safe Havens" },
              { id: "pink_booth", label: "Pink Booths & Police" },
              { id: "hospital", label: "Hospitals" },
              { id: "womens_shelter", label: "Sakhi Crisis Centers" },
            ].map((tab) =>
              _jsx(
                "button",
                {
                  onClick: () => setFilter(tab.id),
                  className: `px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    filter === tab.id
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white/60 hover:bg-white/90 text-slate-700 border border-white/80"
                  }`,
                  children: tab.label,
                },
                tab.id,
              ),
            ),
          }),
          _jsx("p", {
            className: "text-xs sm:text-sm text-slate-600 leading-relaxed",
            children:
              "Verified emergency shelters and police assistance centers equipped with female personnel and CCTV monitoring.",
          }),
        ],
      }),
      routeAudit &&
        _jsxs("div", {
          className:
            "p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xs border border-emerald-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs shadow-2xs",
          children: [
            _jsxs("div", {
              className: "flex items-start gap-3",
              children: [
                _jsxs("div", {
                  className:
                    "w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs",
                  children: [routeAudit.safetyScore, "%"],
                }),
                _jsxs("div", {
                  children: [
                    _jsxs("p", {
                      className: "font-bold text-slate-900 text-sm",
                      children: [
                        "ML Area Safety Audit: ",
                        _jsxs("span", {
                          className: "text-emerald-700",
                          children: [routeAudit.riskLevel, " Zone"],
                        }),
                      ],
                    }),
                    _jsxs("p", {
                      className: "text-slate-600 mt-0.5",
                      children: [
                        routeAudit.lightingStatus,
                        " \u2022 Pink Patrol in ",
                        routeAudit.nearbyPinkBoothKm,
                        " km radius \u2022 Police Response ETA: ~",
                        routeAudit.policeResponseTimeMinutes,
                        " mins",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            _jsx("button", {
              onClick: runRouteAudit,
              className:
                "px-3.5 py-2 bg-white/80 text-emerald-800 border border-white rounded-full font-bold hover:bg-white shrink-0 text-center cursor-pointer shadow-2xs transition-all",
              children: "Refresh Area Scan",
            }),
          ],
        }),
      _jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
        children: filteredZones.map((zone) =>
          _jsxs(
            "div",
            {
              className:
                "bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/80 hover:border-emerald-300 transition-all space-y-3 shadow-2xs",
              children: [
                _jsxs("div", {
                  className: "flex items-start justify-between gap-2",
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsx("span", {
                          className: `text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            zone.type === "pink_booth"
                              ? "bg-pink-100/80 text-pink-700 border border-pink-200/60"
                              : zone.type === "hospital"
                                ? "bg-blue-100/80 text-blue-700 border border-blue-200/60"
                                : "bg-emerald-100/80 text-emerald-700 border border-emerald-200/60"
                          }`,
                          children: zone.type.replace("_", " "),
                        }),
                        _jsx("h4", {
                          className: "font-bold text-slate-900 text-sm mt-1",
                          children: zone.name,
                        }),
                      ],
                    }),
                    _jsxs("span", {
                      className:
                        "flex items-center gap-1 text-amber-600 text-xs font-bold shrink-0",
                      children: [
                        _jsx(Star, {
                          className:
                            "w-3.5 h-3.5 fill-amber-500 text-amber-500",
                        }),
                        " ",
                        zone.rating,
                      ],
                    }),
                  ],
                }),
                _jsxs("p", {
                  className: "text-xs text-slate-600 flex items-center gap-1.5",
                  children: [
                    _jsx(MapPin, {
                      className: "w-3.5 h-3.5 text-slate-400 shrink-0",
                    }),
                    _jsx("span", { children: zone.address }),
                  ],
                }),
                _jsxs("div", {
                  className:
                    "flex items-center justify-between text-xs pt-2 border-t border-white/60",
                  children: [
                    _jsxs("span", {
                      className:
                        "text-emerald-700 font-bold flex items-center gap-1",
                      children: [
                        _jsx(Clock, { className: "w-3.5 h-3.5" }),
                        " 24x7 Active Guard",
                      ],
                    }),
                    _jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        _jsxs("a", {
                          href: `tel:${zone.phone.split("/")[0]}`,
                          className:
                            "px-3 py-1.5 bg-emerald-600 text-white rounded-full font-bold flex items-center gap-1 hover:bg-emerald-700 transition-colors shadow-2xs",
                          children: [
                            _jsx(Phone, { className: "w-3 h-3" }),
                            _jsx("span", { children: "Call Help" }),
                          ],
                        }),
                        _jsxs("a", {
                          href: `https://maps.google.com/?q=${zone.latitude},${zone.longitude}`,
                          target: "_blank",
                          rel: "noreferrer",
                          className:
                            "px-3 py-1.5 bg-white/80 border border-white text-slate-700 rounded-full font-bold flex items-center gap-1 hover:bg-white transition-colors shadow-2xs",
                          children: [
                            _jsx(Navigation, { className: "w-3 h-3" }),
                            _jsx("span", { children: "Route" }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            },
            zone.id,
          ),
        ),
      }),
    ],
  });
};
