import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
export const ProtectedRoute = ({ children, fallbackToLogin }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return _jsx("div", {
      className: "flex items-center justify-center min-h-[400px]",
      children: _jsx("div", {
        className:
          "animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600",
      }),
    });
  }
  // If user is null and fallback requested
  if (!user && fallbackToLogin) {
    fallbackToLogin();
    return null;
  }
  return _jsx(_Fragment, { children: children });
};
