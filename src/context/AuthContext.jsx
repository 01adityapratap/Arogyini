import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api.js";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSOSEvent, setActiveSOSEvent] = useState(null);
  const refreshUser = async () => {
    try {
      const data = await api.getMe();
      setUser(data.user);
    } catch (err) {
      console.warn(
        "Could not fetch logged in user, defaulting to demo user",
        err,
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshUser();
  }, []);
  const login = async (email) => {
    setLoading(true);
    try {
      const data = await api.login(email);
      localStorage.setItem("arogyini_token", data.token);
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };
  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await api.register(userData);
      localStorage.setItem("arogyini_token", data.token);
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("arogyini_token");
    setUser(null);
  };
  const updateProfile = async (updates) => {
    const data = await api.updateProfile(updates);
    setUser(data.user);
  };
  const addEmergencyContact = async (contact) => {
    const data = await api.addEmergencyContact(contact);
    setUser(data.user);
  };
  const removeEmergencyContact = async (contactId) => {
    const data = await api.removeEmergencyContact(contactId);
    setUser(data.user);
  };
  return _jsx(AuthContext.Provider, {
    value: {
      user,
      loading,
      activeSOSEvent,
      setActiveSOSEvent,
      login,
      register,
      logout,
      updateProfile,
      addEmergencyContact,
      removeEmergencyContact,
      refreshUser,
    },
    children: children,
  });
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
