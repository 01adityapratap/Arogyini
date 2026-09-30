import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { SOSButton } from "./components/SOSButton.jsx";
import { RAGAssistantModal } from "./components/RAGAssistantModal.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
// Pages
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Health } from "./pages/Health.jsx";
import { Legal } from "./pages/Legal.jsx";
import { Career } from "./pages/Career.jsx";
import { Safety } from "./pages/Safety.jsx";
import { Profile } from "./pages/Profile.jsx";
import { RAGInspector } from "./pages/RAGInspector.jsx";
const AppContent = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isRAGModalOpen, setIsRAGModalOpen] = useState(false);
  const [ragInitialPillar, setRagInitialPillar] = useState("general");
  const handleOpenRAG = (pillar = "general") => {
    setRagInitialPillar(pillar);
    setIsRAGModalOpen(true);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return _jsx(Home, {
          setActiveTab: setActiveTab,
          onOpenRAG: handleOpenRAG,
        });
      case "about":
        return _jsx(About, {
          setActiveTab: setActiveTab,
          onOpenRAG: handleOpenRAG,
        });
      case "login":
        return _jsx(Login, { setActiveTab: setActiveTab });
      case "register":
        return _jsx(Register, { setActiveTab: setActiveTab });
      case "dashboard":
        return _jsx(ProtectedRoute, {
          fallbackToLogin: () => setActiveTab("login"),
          children: _jsx(Dashboard, {
            setActiveTab: setActiveTab,
            onOpenRAG: handleOpenRAG,
            onTriggerSOS: () => setActiveTab("safety"),
          }),
        });
      case "health":
        return _jsx(Health, { onOpenRAG: handleOpenRAG });
      case "legal":
        return _jsx(Legal, { onOpenRAG: handleOpenRAG });
      case "career":
        return _jsx(Career, { onOpenRAG: handleOpenRAG });
      case "safety":
        return _jsx(Safety, {});
      case "profile":
        return _jsx(ProtectedRoute, {
          fallbackToLogin: () => setActiveTab("login"),
          children: _jsx(Profile, { setActiveTab: setActiveTab }),
        });
      case "rag-inspector":
        return _jsx(RAGInspector, {});
      default:
        return _jsx(Home, {
          setActiveTab: setActiveTab,
          onOpenRAG: handleOpenRAG,
        });
    }
  };
  return _jsxs("div", {
    className:
      "min-h-screen flex flex-col bg-gradient-to-br from-rose-50/90 via-white to-teal-50/90 text-slate-800 selection:bg-rose-100 selection:text-rose-900 font-sans relative overflow-x-hidden",
    children: [
      _jsx("div", {
        className:
          "fixed top-[-5%] left-[-5%] w-[32rem] h-[32rem] bg-rose-300/25 rounded-full blur-3xl pointer-events-none z-0",
      }),
      _jsx("div", {
        className:
          "fixed top-[35%] right-[-5%] w-[36rem] h-[36rem] bg-teal-300/25 rounded-full blur-3xl pointer-events-none z-0",
      }),
      _jsx("div", {
        className:
          "fixed bottom-[-5%] left-[20%] w-[30rem] h-[30rem] bg-indigo-300/20 rounded-full blur-3xl pointer-events-none z-0",
      }),
      _jsx(Navbar, {
        activeTab: activeTab,
        setActiveTab: setActiveTab,
        onOpenRAG: handleOpenRAG,
        onTriggerSOS: () => setActiveTab("safety"),
      }),
      _jsx("main", {
        className: "flex-1 relative z-10",
        children: renderContent(),
      }),
      _jsx(SOSButton, { variant: "floating" }),
      _jsx(RAGAssistantModal, {
        isOpen: isRAGModalOpen,
        onClose: () => setIsRAGModalOpen(false),
        initialPillar: ragInitialPillar,
      }),
      _jsx(Footer, { setActiveTab: setActiveTab, onOpenRAG: handleOpenRAG }),
    ],
  });
};
export default function App() {
  return _jsx(AuthProvider, { children: _jsx(AppContent, {}) });
}
