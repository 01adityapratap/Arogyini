import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import {
  Scale,
  FileText,
  Bot,
  Sparkles,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";
import { api } from "../services/api.js";
export const Legal = ({ onOpenRAG }) => {
  const [legalRights, setLegalRights] = useState([]);
  const [selectedAct, setSelectedAct] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  // Complaint Drafter State
  const [victimName, setVictimName] = useState("");
  const [complaintType, setComplaintType] = useState("posh");
  const [respondentName, setRespondentName] = useState("");
  const [incidentDate, setIncidentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [locationName, setLocationName] = useState("");
  const [incidentDescription, setIncidentDescription] = useState("");
  const [witnessNames, setWitnessNames] = useState("");
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    api
      .getLegalRights()
      .then((res) => setLegalRights(res.legalRights))
      .catch(() => {});
  }, []);
  const handleGenerateDraft = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let draft = "";
    if (complaintType === "posh") {
      draft = `FORMAL COMPLAINT UNDER THE SEXUAL HARASSMENT OF WOMEN AT WORKPLACE (PREVENTION, PROHIBITION AND REDRESSAL) ACT, 2013

Date: ${today}
To:
The Presiding Officer & Members,
Internal Complaints Committee (ICC),
${locationName || "[Company / Institution Name]"}

Subject: Formal Written Complaint of Workplace Sexual Harassment under Section 9 of the POSH Act, 2013

Respected Members of the ICC,

I, ${victimName || "[Complainant Name]"}, currently working at ${locationName || "[Department/Company]"}, wish to submit this formal complaint regarding workplace harassment committed against me by the respondent detailed below.

1. DETAILS OF RESPONDENT:
- Name of Respondent: ${respondentName || "[Respondent Name / Designation]"}
- Nature of Professional Relationship: Colleague / Supervisor

2. INCIDENT PARTICULARS:
- Date(s) & Time of Occurrence: ${incidentDate}
- Specific Location / Platform: ${locationName || "[Office Premises / Digital Channel]"}

3. DETAILED STATEMENT OF FACTS & HARASSMENT:
${incidentDescription || "[Chronological narrative of the unwelcome sexual conduct, remarks, physical contact, or digital harassment]"}

4. WITNESSES / EVIDENCE:
- Key Witnesses: ${witnessNames || "Available upon formal inquiry"}
- Supporting Documentation: Chat logs, email records, and CCTV footage requests attached.

5. RELIEF / INTERIM MEASURES SOUGHT:
In accordance with Section 12 of the POSH Act, 2013, I request:
a) Immediate commencement of inquiry proceedings within 90 days.
b) Appropriate interim relief (restraining the respondent from reporting interactions).
c) Strict confidentiality as mandated under Section 16 of the Act.

I hereby affirm that the facts stated above are true to the best of my knowledge and belief.

Sincerely,
${victimName || "[Complainant Signature / Name]"}`;
    } else if (complaintType === "zero_fir") {
      draft = `APPLICATION FOR REGISTRATION OF ZERO FIRST INFORMATION REPORT (ZERO FIR)
Under Section 154 of the Code of Criminal Procedure, 1973 (CrPC) / BNSS

Date: ${today}
To:
The Station House Officer (SHO),
[Police Station Name / Any Nearest Police Station]

Subject: Request for Immediate Registration of Zero FIR and Transfer to Jurisdictional Police Station

Respected Officer,

I, ${victimName || "[Complainant Name]"}, am submitting this application for the urgent registration of a Zero FIR in respect of a cognizable offense committed against me.

1. PARTICULARS OF INCIDENT:
- Date & Time: ${incidentDate}
- Location of Incident: ${locationName || "[Exact place where incident occurred]"}
- Accused Person(s): ${respondentName || "[Name / Physical description of accused]"}

2. NARRATIVE OF COGNIZABLE OFFENSE:
${incidentDescription || "[Detailed description of physical assault, stalking, eve-teasing, extortion, or harassment]"}

3. WITNESSES / CORROBORATION:
${witnessNames || "Eyewitnesses present at the scene"}

LEGAL PROVISION REGARDING ZERO FIR:
As per the directives of the Hon'ble Supreme Court of India and Ministry of Home Affairs Advisory, a police station is statutorily bound to register a Zero FIR for a cognizable offense irrespective of territorial jurisdiction and initiate preliminary investigation before transferring the case file.

Kindly register this Zero FIR and provide me with a free copy of the FIR as mandated by law.

Yours faithfully,
${victimName || "[Complainant Name]"}
Contact Number: [Complainant Phone]`;
    } else {
      draft = `APPLICATION FOR RELIEF UNDER PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005 (PWDVA)

Date: ${today}
To:
The Protection Officer / Judicial Magistrate First Class,
[Jurisdiction / District]

Subject: Application for Protection Order and Residence Order under Sections 18 & 19 of PWDVA, 2005

Applicant: ${victimName || "[Applicant Name]"}
Respondent: ${respondentName || "[Respondent Name & Relation]"}

STATEMENT OF GRIEVANCE:
1. The applicant has been subjected to domestic violence (physical/verbal/economic abuse) by the respondent on ${incidentDate} at ${locationName || "[Shared Household]"}.
2. Narrative of Abuse:
${incidentDescription || "[Details of domestic violence, deprivation of financial maintenance, or physical intimidation]"}

PRAYER:
The applicant respectfully prays for:
- Protection orders restraining the respondent from committing further violence.
- Right to reside peacefully in the shared household without dispossession.

Applicant: ${victimName || "[Complainant Name]"}`;
    }
    setGeneratedDraft(draft);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  const filteredRights = legalRights.filter((r) => {
    if (selectedAct === "all") return true;
    return r.actName.toLowerCase().includes(selectedAct.toLowerCase());
  });
  return _jsxs("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8",
    children: [
      _jsxs("div", {
        className:
          "glass-panel rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-amber-500/10 border border-white/80",
        children: [
          _jsxs("div", {
            className: "space-y-2 relative z-10",
            children: [
              _jsxs("div", {
                className:
                  "inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider text-indigo-800 border border-white",
                children: [
                  _jsx(Scale, { className: "w-3.5 h-3.5 text-indigo-600" }),
                  _jsx("span", {
                    children: "Pillar 2 \u2022 Legal Awareness & Protection",
                  }),
                ],
              }),
              _jsx("h1", {
                className:
                  "font-serif text-2xl sm:text-4xl font-bold text-slate-900",
                children: "Women's Statutory Legal Rights & Toolkits",
              }),
              _jsx("p", {
                className: "text-xs sm:text-sm text-slate-600 max-w-xl",
                children:
                  "Understand your rights under POSH Act 2013, Maternity benefits, Domestic Violence protection, and generate formal legal complaints automatically.",
              }),
            ],
          }),
          _jsxs("button", {
            onClick: () => onOpenRAG("legal"),
            className:
              "px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-md shadow-indigo-200 cursor-pointer shrink-0 relative z-10",
            children: [
              _jsx(Bot, { className: "w-4 h-4 text-indigo-200" }),
              _jsx("span", { children: "Ask Legal AI Assistant" }),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
        children: [
          _jsx("div", {
            className: "lg:col-span-6 space-y-6",
            children: _jsxs("div", {
              className:
                "glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 border border-white/80",
              children: [
                _jsxs("div", {
                  className: "border-b border-white/60 pb-3",
                  children: [
                    _jsxs("div", {
                      className:
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-100/80 text-indigo-800 text-[11px] font-bold rounded-full uppercase mb-1 border border-indigo-200/60",
                      children: [
                        _jsx(FileText, {
                          className: "w-3.5 h-3.5 text-indigo-600",
                        }),
                        _jsx("span", { children: "Statutory Tool" }),
                      ],
                    }),
                    _jsx("h3", {
                      className: "font-serif text-xl font-bold text-slate-900",
                      children:
                        "Interactive Legal Complaint & Zero FIR Drafter",
                    }),
                    _jsx("p", {
                      className: "text-xs text-slate-500",
                      children:
                        "Fill the parameters below to generate a standardized, legally formatted formal grievance.",
                    }),
                  ],
                }),
                _jsxs("form", {
                  onSubmit: handleGenerateDraft,
                  className: "space-y-4 text-xs",
                  children: [
                    _jsxs("div", {
                      className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                      children: [
                        _jsxs("div", {
                          children: [
                            _jsx("label", {
                              className:
                                "block font-bold text-slate-700 uppercase mb-1",
                              children: "Complaint Type",
                            }),
                            _jsxs("select", {
                              value: complaintType,
                              onChange: (e) => setComplaintType(e.target.value),
                              className:
                                "w-full px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl font-medium text-slate-900 shadow-2xs",
                              children: [
                                _jsx("option", {
                                  value: "posh",
                                  children: "Workplace Harassment (POSH ICC)",
                                }),
                                _jsx("option", {
                                  value: "zero_fir",
                                  children: "Police Zero FIR (Any Station)",
                                }),
                                _jsx("option", {
                                  value: "pwdva",
                                  children:
                                    "Domestic Violence Protection (PWDVA)",
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          children: [
                            _jsx("label", {
                              className:
                                "block font-bold text-slate-700 uppercase mb-1",
                              children: "Your Full Name",
                            }),
                            _jsx("input", {
                              type: "text",
                              required: true,
                              value: victimName,
                              onChange: (e) => setVictimName(e.target.value),
                              placeholder: "e.g. Ananya Rao",
                              className:
                                "w-full px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-slate-900 shadow-2xs",
                            }),
                          ],
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
                                "block font-bold text-slate-700 uppercase mb-1",
                              children: "Respondent / Accused Name",
                            }),
                            _jsx("input", {
                              type: "text",
                              required: true,
                              value: respondentName,
                              onChange: (e) =>
                                setRespondentName(e.target.value),
                              placeholder: "Name & Designation of Accused",
                              className:
                                "w-full px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-slate-900 shadow-2xs",
                            }),
                          ],
                        }),
                        _jsxs("div", {
                          children: [
                            _jsx("label", {
                              className:
                                "block font-bold text-slate-700 uppercase mb-1",
                              children: "Date of Incident",
                            }),
                            _jsx("input", {
                              type: "date",
                              value: incidentDate,
                              onChange: (e) => setIncidentDate(e.target.value),
                              className:
                                "w-full px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-slate-900 shadow-2xs",
                            }),
                          ],
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("label", {
                          className:
                            "block font-bold text-slate-700 uppercase mb-1",
                          children: "Location / Workplace Department",
                        }),
                        _jsx("input", {
                          type: "text",
                          value: locationName,
                          onChange: (e) => setLocationName(e.target.value),
                          placeholder:
                            "e.g. Bangalore Branch Office / 4th Floor Meeting Room",
                          className:
                            "w-full px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-slate-900 shadow-2xs",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("label", {
                          className:
                            "block font-bold text-slate-700 uppercase mb-1",
                          children:
                            "Detailed Statement of Facts / Incident Narrative",
                        }),
                        _jsx("textarea", {
                          rows: 3,
                          required: true,
                          value: incidentDescription,
                          onChange: (e) =>
                            setIncidentDescription(e.target.value),
                          placeholder:
                            "State the sequence of unwelcome physical, verbal, or digital conduct clearly...",
                          className:
                            "w-full px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-xs text-slate-900 shadow-2xs",
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("label", {
                          className:
                            "block font-bold text-slate-700 uppercase mb-1",
                          children: "Witnesses / Evidence",
                        }),
                        _jsx("input", {
                          type: "text",
                          value: witnessNames,
                          onChange: (e) => setWitnessNames(e.target.value),
                          placeholder:
                            "e.g. Email threads, Slack messages, Colleague 1 & Colleague 2",
                          className:
                            "w-full px-3.5 py-2 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl text-slate-900 shadow-2xs",
                        }),
                      ],
                    }),
                    _jsxs("button", {
                      type: "submit",
                      className:
                        "w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer",
                      children: [
                        _jsx(Sparkles, {
                          className: "w-4 h-4 text-indigo-200",
                        }),
                        _jsx("span", {
                          children: "Generate Legally Formatted Draft",
                        }),
                      ],
                    }),
                  ],
                }),
                generatedDraft &&
                  _jsxs("div", {
                    className: "pt-4 border-t border-white/60 space-y-3",
                    children: [
                      _jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          _jsxs("span", {
                            className:
                              "font-bold text-slate-800 text-xs uppercase flex items-center gap-1.5",
                            children: [
                              _jsx(FileText, {
                                className: "w-3.5 h-3.5 text-indigo-600",
                              }),
                              "Generated Legal Submission Draft:",
                            ],
                          }),
                          _jsxs("button", {
                            onClick: copyToClipboard,
                            className:
                              "px-3.5 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm",
                            children: [
                              copied
                                ? _jsx(CheckCircle2, {
                                    className: "w-3.5 h-3.5 text-emerald-400",
                                  })
                                : _jsx(Copy, { className: "w-3.5 h-3.5" }),
                              _jsx("span", {
                                children: copied
                                  ? "Copied to Clipboard!"
                                  : "Copy Draft",
                              }),
                            ],
                          }),
                        ],
                      }),
                      _jsx("div", {
                        className:
                          "p-4 bg-slate-900/90 backdrop-blur-md text-slate-100 rounded-2xl font-mono text-[11px] leading-relaxed max-h-80 overflow-y-auto whitespace-pre-wrap select-all border border-slate-700/60 shadow-inner",
                        children: generatedDraft,
                      }),
                    ],
                  }),
              ],
            }),
          }),
          _jsx("div", {
            className: "lg:col-span-6 space-y-6",
            children: _jsxs("div", {
              className:
                "glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 border border-white/80",
              children: [
                _jsxs("div", {
                  children: [
                    _jsx("h3", {
                      className: "font-serif text-xl font-bold text-slate-900",
                      children: "Key Women's Protection Acts in India",
                    }),
                    _jsx("p", {
                      className: "text-xs text-slate-500",
                      children:
                        "Statutory timelines, complaint avenues, and landmark protective provisions.",
                    }),
                  ],
                }),
                _jsx("div", {
                  className: "space-y-3",
                  children: legalRights.map((act) => {
                    const isExpanded = expandedId === act.id;
                    return _jsxs(
                      "div",
                      {
                        className:
                          "p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 hover:border-indigo-300 transition-all space-y-2 shadow-2xs",
                        children: [
                          _jsxs("div", {
                            onClick: () =>
                              setExpandedId(isExpanded ? null : act.id),
                            className:
                              "flex items-start justify-between gap-3 cursor-pointer",
                            children: [
                              _jsxs("div", {
                                children: [
                                  _jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                      _jsx("span", {
                                        className:
                                          "text-[10px] font-bold uppercase bg-indigo-100/80 text-indigo-900 px-2.5 py-0.5 rounded-full border border-indigo-200/50",
                                        children: act.category,
                                      }),
                                      _jsx("span", {
                                        className:
                                          "text-xs font-mono font-bold text-slate-500",
                                        children: act.year,
                                      }),
                                    ],
                                  }),
                                  _jsx("h4", {
                                    className:
                                      "font-bold text-slate-900 text-sm mt-1",
                                    children: act.actName,
                                  }),
                                ],
                              }),
                              isExpanded
                                ? _jsx(ChevronUp, {
                                    className:
                                      "w-4 h-4 text-slate-500 shrink-0",
                                  })
                                : _jsx(ChevronDown, {
                                    className:
                                      "w-4 h-4 text-slate-500 shrink-0",
                                  }),
                            ],
                          }),
                          _jsx("p", {
                            className: "text-xs text-slate-600 leading-relaxed",
                            children: act.summary,
                          }),
                          isExpanded &&
                            _jsxs("div", {
                              className:
                                "pt-3 border-t border-white/80 text-xs space-y-3",
                              children: [
                                _jsxs("div", {
                                  children: [
                                    _jsx("span", {
                                      className:
                                        "font-bold text-slate-800 uppercase text-[10px]",
                                      children: "Key Legal Rights:",
                                    }),
                                    _jsx("ul", {
                                      className:
                                        "mt-1 space-y-1 text-slate-700",
                                      children: (
                                        act.keyRights ||
                                        act.keyProtections ||
                                        []
                                      ).map((kr, idx) =>
                                        _jsxs(
                                          "li",
                                          {
                                            className:
                                              "flex items-start gap-1.5",
                                            children: [
                                              _jsx(CheckCircle2, {
                                                className:
                                                  "w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5",
                                              }),
                                              _jsx("span", { children: kr }),
                                            ],
                                          },
                                          idx,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                                _jsxs("div", {
                                  className:
                                    "p-3 bg-indigo-50/80 backdrop-blur-xs rounded-2xl text-slate-800 text-xs border border-indigo-100",
                                  children: [
                                    _jsx("span", {
                                      className:
                                        "font-bold block text-indigo-900 mb-0.5",
                                      children: "Statutory Filing Procedure:",
                                    }),
                                    _jsx("p", {
                                      children:
                                        act.howToClaim ||
                                        (act.howToExercise
                                          ? act.howToExercise.join(" ")
                                          : "Refer to authorized legal counsel / NALSA 15100."),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      },
                      act.id,
                    );
                  }),
                }),
                _jsxs("div", {
                  className:
                    "glass-dark text-white rounded-3xl p-5 space-y-2 text-xs border border-slate-700/60 shadow-md",
                  children: [
                    _jsxs("span", {
                      className:
                        "font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5",
                      children: [
                        _jsx(Phone, { className: "w-4 h-4" }),
                        " Free National Legal Aid Contacts",
                      ],
                    }),
                    _jsxs("p", {
                      className: "text-slate-300 text-[11px]",
                      children: [
                        "Under Section 12 of the Legal Services Authorities Act, 1987, all women in India are entitled to",
                        " ",
                        _jsx("strong", {
                          children: "100% Free Legal Representation",
                        }),
                        " in all courts regardless of income.",
                      ],
                    }),
                    _jsxs("div", {
                      className: "flex flex-wrap gap-2 pt-1",
                      children: [
                        _jsx("a", {
                          href: "tel:15100",
                          className:
                            "px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-full font-mono font-bold text-yellow-300 transition-colors",
                          children: "NALSA Toll-Free: 15100",
                        }),
                        _jsx("a", {
                          href: "tel:7827170170",
                          className:
                            "px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-full font-mono font-bold text-yellow-300 transition-colors",
                          children: "NCW Helpline: 7827170170",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
