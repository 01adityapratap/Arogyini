import React, { useState } from "react";
import {
  Heart,
  Scale,
  Briefcase,
  ShieldAlert,
  Bot,
  User as UserIcon,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  Info,
  Layers,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenRAG,
  onTriggerSOS,
}) => {
  const { user, activeSOSEvent } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Sparkles,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Sparkles,
      authRequired: true,
    },
    {
      id: "health",
      label: "Health",
      icon: Heart,
      //   badge: "ML Screening",
    },
    {
      id: "legal",
      label: "Legal",
      icon: Scale,
      //   badge: "POSH & Acts",
    },
    {
      id: "career",
      label: "Career",
      icon: Briefcase,
      //   badge: "Returnships",
    },
    {
      id: "safety",
      label: "Safety",
      icon: ShieldAlert,
      alert: true,
    },
    {
      id: "about",
      label: "About",
      icon: Info,
    },
    {
      id: "rag-inspector",
      label: "RAG Lab",
      icon: Layers,
      //   badge: "Pluggable",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-white/50 shadow-xs">
      {/* SOS Active Banner */}
      {activeSOSEvent && (
        <div className="bg-red-600 text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <ShieldAlert className="w-4 h-4 shrink-0" />

            <span>
              <strong>EMERGENCY SOS ACTIVE:</strong> Distress broadcasted with
              live GPS to guardians & Police (112).
            </span>
          </div>

          <button
            onClick={() => setActiveTab("safety")}
            className="bg-white text-red-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-50 uppercase tracking-wide cursor-pointer shadow-sm"
          >
            View Live Feed
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16 sm:h-18">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
              <span className="font-serif font-black">A</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-rose-600">
                  AROGYINI
                </span>

                {/* <span className="bg-rose-100/80 backdrop-blur-xs text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-rose-200/60 hidden sm:inline-block">
                  Holistic
                </span> */}
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 min-w-0 max-w-[calc(100%-330px)] xl:max-w-[calc(100%-350px)] items-center justify-center gap-0.5 overflow-hidden pr-1 mr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`shrink-0 px-1.5 xl:px-2 py-1.5 rounded-full text-[9px] xl:text-[10px] 2xl:text-xs font-medium transition-all flex items-center gap-0.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-rose-600 font-bold bg-white/80 backdrop-blur-sm border border-white shadow-xs"
                      : "text-slate-600 hover:text-rose-600 hover:bg-white/40"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? "text-rose-600" : "text-slate-500"
                    }`}
                  />

                  <span className="max-w-[52px] xl:max-w-[64px] 2xl:max-w-none truncate">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="text-[7px] px-1 py-0.1 bg-rose-100/70 text-rose-700 rounded-md font-semibold border border-rose-200/50 whitespace-nowrap hidden xl:inline-block">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side Buttons */}
          <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 ml-auto">
            {/* RAG AI Button */}
            <button
              id="nav-btn-rag-ai"
              onClick={() => onOpenRAG()}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-500/10 backdrop-blur-md border border-indigo-200 text-indigo-700 rounded-full text-xs font-semibold hover:bg-indigo-500/20 transition-all shadow-xs cursor-pointer"
              title="Ask Arogyini RAG AI"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-600" />

              <span>Arogyini AI</span>

              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* SOS Button */}
            {/* <button
              id="nav-btn-sos-instant"
              onClick={onTriggerSOS}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold shadow-lg shadow-rose-200 uppercase text-xs tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-white animate-bounce" />

              <span>SOS Emergency</span>
            </button> */}

            {/* Profile Button */}
            <button
              id="nav-btn-profile"
              onClick={() => setActiveTab(user ? "profile" : "login")}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "profile"
                  ? "border-rose-400 bg-rose-50/80 text-rose-700 shadow-xs"
                  : "border-white/80 bg-white/60 text-slate-700 hover:bg-white/90"
              }`}
              title={user ? `Profile: ${user.name}` : "Login / Register"}
            >
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                {user ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>

              {user && (
                <span className="hidden md:inline text-xs font-medium text-slate-700 max-w-[80px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="nav-btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl bg-white/50 border border-white/60"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/80 backdrop-blur-xl border-b border-white/60 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-rose-500/15 text-rose-700 font-bold border border-rose-200/70"
                    : "text-slate-700 hover:bg-white/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-rose-600" : "text-slate-500"
                    }`}
                  />

                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Mobile Bottom Section */}
          <div className="pt-3 border-t border-white/60 flex flex-col gap-2">
            {/* Mobile RAG AI */}
            <button
              onClick={() => {
                onOpenRAG();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-500/10 backdrop-blur-md border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold"
            >
              <Bot className="w-4 h-4 text-indigo-600" />

              <span>Ask Arogyini RAG AI Assistant</span>
            </button>

            {/* Emergency Information */}
            <div className="flex items-center justify-between text-xs text-slate-700 px-3 py-1.5 bg-white/60 rounded-xl border border-white/60">
              <span className="flex items-center gap-1 font-medium text-rose-700">
                <PhoneCall className="w-3.5 h-3.5" />
                Emergency: 112 / 181
              </span>

              <span className="text-slate-500 text-[11px]">24x7 Toll-Free</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
