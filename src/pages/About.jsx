import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import {
  Heart,
  Scale,
  Briefcase,
  ShieldAlert,
  Bot,
  Layers,
  Cpu,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const About = ({ onOpenRAG, setActiveTab }) => {
  const phases = [
    {
      num: 1,
      name: "Requirement Analysis",
      desc: "Understanding user needs, emergency workflows, and clinical/legal boundaries.",
      status: "Completed",
    },
    {
      num: 2,
      name: "System Design",
      desc: "Designing 4-pillar modular architecture, emergency GPS flow, and UI/UX typography.",
      status: "Completed",
    },
    {
      num: 3,
      name: "Frontend Development",
      desc: "Building responsive, accessible React interface with Tailwind CSS and Motion.",
      status: "Completed",
    },
    {
      num: 4,
      name: "Backend Development",
      desc: "Developing Node.js / Express REST API routes for auth, health, career, and SOS.",
      status: "Completed",
    },
    {
      num: 5,
      name: "Database Integration",
      desc: "Implementing MERN-compatible in-memory and persistent document data models.",
      status: "Completed",
    },
    {
      num: 6,
      name: "AI/ML & RAG Integration",
      desc: "Adding predictive health models & pluggable Python RAG vector retriever interface.",
      status: "Ready for Model Plug",
    },
    {
      num: 7,
      name: "Testing & Security Audit",
      desc: "Simulating emergency dispatches, audio sirens, and role access security rules.",
      status: "Active",
    },
    {
      num: 8,
      name: "Deployment & Scale",
      desc: "Production compilation, containerization, and Cloud Run execution.",
      status: "Live",
    },
  ];

  const pillars = [
    {
      icon: Heart,
      title: "Healthcare",
      desc: "Predictive health insights, symptom guidance, and wellness support tailored to women’s needs.",
    },
    {
      icon: Scale,
      title: "Legal Rights",
      desc: "Clear legal education on workplace rights, health protections, and support systems for survivors.",
    },
    {
      icon: Briefcase,
      title: "Career Growth",
      desc: "Career returnship pathways, skill support, and confidence-building guidance for empowered transitions.",
    },
    {
      icon: ShieldAlert,
      title: "Safety & Emergency",
      desc: "SOS alerts, guardian dispatch, GPS-linked emergency workflows, and safe-zone awareness.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/70 backdrop-blur-md border border-white/80 rounded-full text-xs font-bold uppercase tracking-wider text-rose-700 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>Project Specification & Architecture</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          About Project AROGYINI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          A holistic, women-centric digital platform designed to provide
          accessible guidance, personal safety, and empowerment through four
          core pillars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xs space-y-3 border border-white/80">
          <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Executive Abstract
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>Arogyini</strong> is a digital ecosystem integrating four
            core pillars: Healthcare, Legal Rights, Career Growth, and Emergency
            Safety. It provides reliable information, personalized assistance,
            and real-time distress communication with guardians and law
            enforcement authorities (112 / 1091) accompanied by live GPS
            coordinates.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Built on full-stack MERN architecture, the system incorporates
            Machine Learning for predictive health risk analysis and a{" "}
            <strong>Retrieval-Augmented Generation (RAG)</strong>
            microservice for context-aware guidance.
          </p>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xs space-y-3 border border-white/80">
          <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            Motivation & Problem Statement
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Women frequently encounter fragmented portals when seeking advice on
            reproductive health, workplace legal remedies, career returnships
            after gaps, and emergency safety.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Arogyini eliminates this friction by unifying these vital services
            into one secure, accessible, zero-log application with automated
            assistance and emergency dispatch.
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 border border-white/80">
        <div className="border-b border-white/60 pb-4">
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            The Four Core Pillars
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered with clear separation of concerns, standardized database
            schemas, and unified user-centric service flows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-2xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 border border-white/80">
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            Project Lifecycle
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900 mt-1">
            Planning of Work & Milestones
          </h3>
        </div>

        <div className="space-y-3">
          {phases.map((ph) => (
            <div
              key={ph.num}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 gap-2 text-xs shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                  {ph.num}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {ph.name}
                  </h4>
                  <p className="text-slate-600 mt-0.5">{ph.desc}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 w-fit ${
                  ph.status === "Completed" || ph.status === "Live"
                    ? "bg-emerald-100/80 text-emerald-800 border border-emerald-200/60"
                    : "bg-indigo-100/80 text-indigo-800 border border-indigo-200/60"
                }`}
              >
                {ph.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 border border-slate-700/60">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Pluggable Python RAG Architecture</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Ready for Your Custom AI / RAG Model
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          The Arogyini platform has been built with clean, modular contracts.
          You can drop your custom LangChain, ChromaDB, or SentenceTransformers
          code directly into
          <code className="text-amber-300 font-mono"> rag-service/</code> and
          the Express backend will forward all queries seamlessly.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => setActiveTab("rag-inspector")}
            className="px-5 py-2.5 bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-full hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Open RAG Integration Sandbox</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenRAG()}
            className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Bot className="w-4 h-4 text-indigo-300" />
            <span>Test Live RAG Assistant</span>
          </button>
        </div>
      </div>
    </div>
  );
};
