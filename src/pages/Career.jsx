import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Award,
  GraduationCap,
  Search,
  Bookmark,
  ExternalLink,
  MapPin,
  IndianRupee,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
export const Career = ({ onOpenRAG }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedJobIds, setSavedJobIds] = useState(user?.savedJobs || []);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");
  useEffect(() => {
    api
      .getJobs()
      .then((res) => setJobs(res.jobs))
      .catch(() => {});
  }, []);
  const toggleSave = (id) => {
    if (savedJobIds.includes(id)) {
      setSavedJobIds(savedJobIds.filter((j) => j !== id));
    } else {
      setSavedJobIds([...savedJobIds, id]);
    }
  };
  const handleApply = (id) => {
    if (!appliedJobIds.includes(id)) {
      setAppliedJobIds([...appliedJobIds, id]);
    }
  };
  const scholarships = [
    {
      id: "sch_1",
      title: "AICTE Pragati Scholarship for Girl Students",
      provider: "Ministry of Education, Govt of India",
      amount: "₹50,000 / year + tuition allowance",
      eligibility:
        "Girls admitted to 1st year degree/diploma technical courses. Family income < ₹8 LPA.",
      deadline: "October 31, 2026",
      link: "https://scholarships.gov.in",
    },
    {
      id: "sch_2",
      title: "Google Generation Scholarship (APAC)",
      provider: "Google for Education",
      amount: "$2,500 USD (Approx ₹2.1 Lakhs)",
      eligibility:
        "Women students in Computer Science / Engineering programs showcasing leadership.",
      deadline: "November 15, 2026",
      link: "https://buildyourfuture.withgoogle.com",
    },
    {
      id: "sch_3",
      title: "Stand-Up India Scheme for Women Entrepreneurs",
      provider: "SIDBI / Ministry of Finance",
      amount: "Bank Loans ₹10 Lakhs to ₹1 Crore",
      eligibility:
        "Female founders establishing greenfield manufacturing, service, or trading enterprises.",
      deadline: "Open Year-Round",
      link: "https://www.standupmitra.in",
    },
    {
      id: "sch_4",
      title: "Adobe India Women-in-Technology Scholarship",
      provider: "Adobe Systems India",
      amount: "Full Tuition + Summer Internship at Adobe",
      eligibility:
        "Female undergraduate/master’s students in B.Tech/M.Tech Computer Science.",
      deadline: "December 2026",
      link: "https://www.adobe.com/careers",
    },
  ];
  const filteredJobs = jobs.filter((j) => {
    const skills = j.skillsRequired || j.requirements || [];
    const matchesFilter = filterType === "all" || j.type === filterType;
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });
  return _jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
    children: [
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-indigo-500/10 border border-white/80",
        children: [
          _jsxs("div", {
            className: "space-y-2 relative z-10",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider text-teal-800 border border-white",
                children: [
                  _jsx(Briefcase, { className: "w-3.5 h-3.5 text-teal-600" }),
                  _jsx("span", {
                    children:
                      "Pillar 3 \u2022 Career Growth & Socio-Economic Equity",
                  }),
                ],
              }),
              _jsx("h1", {
                className:
                  "font-serif text-2xl sm:text-4xl font-bold text-slate-900",
                children: "Returnships, Tech Grants & Careers",
              }),
              _jsx("p", {
                className: "text-xs sm:text-sm text-slate-600 max-w-xl",
                children:
                  "Explore curated returnship programs for career break resumption, remote opportunities, and government financial grants for female tech aspirants.",
              }),
            ],
          }),
          _jsxs("button", {
            onClick: () => onOpenRAG("career"),
            className:
              "px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-md shadow-teal-200 cursor-pointer shrink-0 relative z-10",
            children: [
              _jsx(Bot, { className: "w-4 h-4 text-teal-200" }),
              _jsx("span", { children: "Ask Career & Grant AI" }),
            ],
          }),
        ],
      }),
      _jsx("div", {
        className:
          "flex items-center gap-2 border-b border-white/60 pb-3 overflow-x-auto",
        children: [
          { id: "jobs", label: "Job & Returnship Openings", icon: Briefcase },
          {
            id: "scholarships",
            label: "Govt & Private Scholarships",
            icon: GraduationCap,
          },
          {
            id: "mentorship",
            label: "Executive Mentorship & Resume Tips",
            icon: Award,
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
                  ? "bg-teal-600 text-white shadow-md shadow-teal-200 border border-teal-500"
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
      activeTab === "jobs" &&
        _jsxs("div", {
          className: "space-y-6",
          children: [
            _jsxs("div", {
              className:
                "glass-panel p-4 rounded-2xl shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/80",
              children: [
                _jsxs("div", {
                  className: "relative w-full sm:w-80",
                  children: [
                    _jsx(Search, {
                      className:
                        "w-4 h-4 text-slate-400 absolute left-3.5 top-3",
                    }),
                    _jsx("input", {
                      type: "text",
                      value: searchQuery,
                      onChange: (e) => setSearchQuery(e.target.value),
                      placeholder: "Search skills, roles, companies...",
                      className:
                        "w-full pl-9 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-xl text-xs text-slate-900 shadow-2xs",
                    }),
                  ],
                }),
                _jsx("div", {
                  className: "flex flex-wrap gap-1.5 w-full sm:w-auto",
                  children: [
                    { id: "all", label: "All Roles" },
                    { id: "returnship", label: "Career Break Returnships" },
                    { id: "remote", label: "100% Remote" },
                    { id: "full-time", label: "Full Time" },
                  ].map((f) =>
                    _jsx(
                      "button",
                      {
                        onClick: () => setFilterType(f.id),
                        className: `px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                          filterType === f.id
                            ? "bg-teal-600 text-white font-bold shadow-xs"
                            : "bg-white/60 hover:bg-white/90 text-slate-600 border border-white/80"
                        }`,
                        children: f.label,
                      },
                      f.id,
                    ),
                  ),
                }),
              ],
            }),
            _jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-6",
              children: filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                const isApplied = appliedJobIds.includes(job.id);
                return _jsxs(
                  "div",
                  {
                    className:
                      "glass-panel rounded-3xl p-6 hover:shadow-md transition-all shadow-2xs flex flex-col justify-between space-y-4 border border-white/80",
                    children: [
                      _jsxs("div", {
                        className: "space-y-3",
                        children: [
                          _jsxs("div", {
                            className: "flex items-start justify-between gap-2",
                            children: [
                              _jsxs("div", {
                                children: [
                                  _jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      _jsx("span", {
                                        className: `text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                          job.type === "returnship"
                                            ? "bg-purple-100/80 text-purple-700 border border-purple-200/60"
                                            : "bg-teal-100/80 text-teal-700 border border-teal-200/60"
                                        }`,
                                        children: job.type,
                                      }),
                                      job.careerBreakFriendly &&
                                        _jsx("span", {
                                          className:
                                            "text-[10px] bg-emerald-100/80 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200/60",
                                          children: "Career Gap Friendly",
                                        }),
                                    ],
                                  }),
                                  _jsx("h3", {
                                    className:
                                      "font-serif text-lg font-bold text-slate-900 mt-1.5",
                                    children: job.title,
                                  }),
                                  _jsx("p", {
                                    className:
                                      "text-xs font-semibold text-slate-700",
                                    children: job.company,
                                  }),
                                ],
                              }),
                              _jsx("button", {
                                onClick: () => toggleSave(job.id),
                                className:
                                  "p-2 text-slate-400 hover:text-teal-600 cursor-pointer",
                                children: _jsx(Bookmark, {
                                  className: `w-5 h-5 ${isSaved ? "fill-teal-600 text-teal-600" : ""}`,
                                }),
                              }),
                            ],
                          }),
                          _jsx("p", {
                            className: "text-xs text-slate-600 leading-relaxed",
                            children: job.description,
                          }),
                          _jsx("div", {
                            className: "flex flex-wrap gap-1.5 pt-1",
                            children: (
                              job.skillsRequired ||
                              job.requirements ||
                              []
                            ).map((skill, sIdx) =>
                              _jsx(
                                "span",
                                {
                                  className:
                                    "bg-white/80 border border-white text-slate-700 text-[10px] font-medium px-2.5 py-0.5 rounded-full shadow-2xs",
                                  children: skill,
                                },
                                sIdx,
                              ),
                            ),
                          }),
                        ],
                      }),
                      _jsxs("div", {
                        className:
                          "pt-4 border-t border-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs",
                        children: [
                          _jsxs("div", {
                            className: "space-y-0.5 text-slate-600 font-medium",
                            children: [
                              _jsxs("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                  _jsx(MapPin, {
                                    className: "w-3.5 h-3.5 text-slate-400",
                                  }),
                                  _jsx("span", { children: job.location }),
                                ],
                              }),
                              _jsxs("div", {
                                className:
                                  "flex items-center gap-1.5 text-slate-900 font-bold",
                                children: [
                                  _jsx(IndianRupee, {
                                    className: "w-3.5 h-3.5 text-emerald-600",
                                  }),
                                  _jsx("span", {
                                    children: job.stipendOrSalary,
                                  }),
                                ],
                              }),
                            ],
                          }),
                          _jsx("button", {
                            onClick: () => handleApply(job.id),
                            disabled: isApplied,
                            className: `px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              isApplied
                                ? "bg-emerald-100/80 text-emerald-800 border border-emerald-200"
                                : "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-200"
                            }`,
                            children: isApplied
                              ? _jsxs(_Fragment, {
                                  children: [
                                    _jsx(CheckCircle2, {
                                      className: "w-3.5 h-3.5",
                                    }),
                                    _jsx("span", { children: "Applied" }),
                                  ],
                                })
                              : _jsxs(_Fragment, {
                                  children: [
                                    _jsx("span", { children: "Apply Now" }),
                                    _jsx(ExternalLink, {
                                      className: "w-3.5 h-3.5",
                                    }),
                                  ],
                                }),
                          }),
                        ],
                      }),
                    ],
                  },
                  job.id,
                );
              }),
            }),
          ],
        }),
      activeTab === "scholarships" &&
        _jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          children: scholarships.map((sch) =>
            _jsxs(
              "div",
              {
                className:
                  "glass-panel rounded-3xl p-6 shadow-2xs space-y-4 flex flex-col justify-between border border-white/80",
                children: [
                  _jsxs("div", {
                    className: "space-y-2",
                    children: [
                      _jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          _jsx("span", {
                            className:
                              "text-[10px] font-bold uppercase bg-teal-100/80 text-teal-800 px-2.5 py-0.5 rounded-full border border-teal-200/50",
                            children: sch.provider,
                          }),
                          _jsxs("span", {
                            className: "text-xs font-bold text-rose-600",
                            children: ["Deadline: ", sch.deadline],
                          }),
                        ],
                      }),
                      _jsx("h3", {
                        className:
                          "font-serif text-lg font-bold text-slate-900",
                        children: sch.title,
                      }),
                      _jsxs("div", {
                        className:
                          "p-3 bg-teal-50/80 rounded-2xl border border-teal-100 text-teal-950 font-bold text-xs",
                        children: ["Grant Value: ", sch.amount],
                      }),
                      _jsxs("p", {
                        className: "text-xs text-slate-600 leading-relaxed",
                        children: [
                          _jsx("strong", { children: "Eligibility:" }),
                          " ",
                          sch.eligibility,
                        ],
                      }),
                    ],
                  }),
                  _jsx("div", {
                    className: "pt-3 border-t border-white/60",
                    children: _jsxs("a", {
                      href: sch.link,
                      target: "_blank",
                      rel: "noreferrer",
                      className:
                        "w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-teal-200",
                      children: [
                        _jsx("span", { children: "Apply on Official Portal" }),
                        _jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                      ],
                    }),
                  }),
                ],
              },
              sch.id,
            ),
          ),
        }),
      activeTab === "mentorship" &&
        _jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-6",
          children: [
            _jsxs("div", {
              className:
                "glass-panel p-6 sm:p-8 rounded-3xl shadow-xs space-y-4 border border-white/80",
              children: [
                _jsx("h3", {
                  className: "font-serif text-xl font-bold text-slate-900",
                  children: "Career Gap Resume Blueprint",
                }),
                _jsx("p", {
                  className: "text-xs text-slate-600 leading-relaxed",
                  children:
                    "How to position maternity, caregiving, or health breaks as strengths during executive interviews:",
                }),
                _jsxs("ul", {
                  className: "space-y-2 text-xs text-slate-700",
                  children: [
                    _jsxs("li", {
                      className:
                        "p-3 bg-white/60 backdrop-blur-sm rounded-2xl flex items-start gap-2 border border-white/80 shadow-2xs",
                      children: [
                        _jsx(CheckCircle2, {
                          className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5",
                        }),
                        _jsx("span", {
                          children:
                            "Use a functional / hybrid resume format focusing on core competencies rather than a chronological timeline.",
                        }),
                      ],
                    }),
                    _jsxs("li", {
                      className:
                        "p-3 bg-white/60 backdrop-blur-sm rounded-2xl flex items-start gap-2 border border-white/80 shadow-2xs",
                      children: [
                        _jsx(CheckCircle2, {
                          className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5",
                        }),
                        _jsx("span", {
                          children:
                            "List upskilling certifications, open-source code contributions, and freelance consultations during the transition window.",
                        }),
                      ],
                    }),
                    _jsxs("li", {
                      className:
                        "p-3 bg-white/60 backdrop-blur-sm rounded-2xl flex items-start gap-2 border border-white/80 shadow-2xs",
                      children: [
                        _jsx(CheckCircle2, {
                          className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5",
                        }),
                        _jsx("span", {
                          children:
                            'Confidently state: "Took a planned personal sabbatical and dedicated time to mastering cloud architecture and modern React systems."',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "glass-panel p-6 sm:p-8 rounded-3xl shadow-xs space-y-4 border border-white/80",
              children: [
                _jsx("h3", {
                  className: "font-serif text-xl font-bold text-slate-900",
                  children: "1-on-1 Female Leadership Network",
                }),
                _jsx("p", {
                  className: "text-xs text-slate-600 leading-relaxed",
                  children:
                    "Connect with senior engineering directors, legal counsel, and venture capitalists:",
                }),
                _jsxs("div", {
                  className: "space-y-3 text-xs",
                  children: [
                    _jsxs("div", {
                      className:
                        "p-3.5 bg-teal-500/10 border border-teal-200/60 rounded-2xl flex items-center justify-between",
                      children: [
                        _jsxs("div", {
                          children: [
                            _jsx("p", {
                              className: "font-bold text-slate-900",
                              children: "Women in Tech India (WITI)",
                            }),
                            _jsx("p", {
                              className: "text-slate-500",
                              children:
                                "Bi-weekly mock tech interviews & resume audits",
                            }),
                          ],
                        }),
                        _jsx("span", {
                          className:
                            "bg-teal-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold",
                          children: "Join Circle",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className:
                        "p-3.5 bg-purple-500/10 border border-purple-200/60 rounded-2xl flex items-center justify-between",
                      children: [
                        _jsxs("div", {
                          children: [
                            _jsx("p", {
                              className: "font-bold text-slate-900",
                              children: "Sheroes Returnship Mentorship",
                            }),
                            _jsx("p", {
                              className: "text-slate-500",
                              children:
                                "Salary negotiation & corporate re-entry coaching",
                            }),
                          ],
                        }),
                        _jsx("span", {
                          className:
                            "bg-purple-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold",
                          children: "Join Circle",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    ],
  });
};
