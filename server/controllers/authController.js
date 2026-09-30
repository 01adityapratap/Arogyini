import { UserModel } from "../models/User.js";
export const authController = {
  async register(req, res) {
    try {
      const {
        name,
        email,
        password,
        phone,
        role,
        emergencyContacts,
        healthProfile,
      } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }
      const existing = await UserModel.findByEmail(email);
      if (existing) {
        return res
          .status(400)
          .json({ error: "An account with this email already exists" });
      }
      const user = await UserModel.create({
        name,
        email,
        phone,
        role: role || "user",
        emergencyContacts: emergencyContacts || [],
        healthProfile: healthProfile || {},
      });
      return res.status(201).json({
        message: "Registration successful",
        user,
        token: user.id,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message || "Registration failed" });
    }
  },
  async login(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      let user = await UserModel.findByEmail(email);
      if (!user) {
        // Auto create or fallback demo login
        user = await UserModel.create({
          name: email.split("@")[0],
          email,
        });
      }
      return res.json({
        message: "Login successful",
        user,
        token: user.id,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message || "Login failed" });
    }
  },
  async getMe(req, res) {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await UserModel.findById(req.user.id);
    return res.json({ user: user || req.user });
  },
  async updateProfile(req, res) {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const updated = await UserModel.update(req.user.id, req.body);
    return res.json({ message: "Profile updated", user: updated });
  },
  async addEmergencyContact(req, res) {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { name, relation, phone, notifyOnSOS, priority } = req.body;
    if (!name || !phone) {
      return res
        .status(400)
        .json({ error: "Contact name and phone are required" });
    }
    const updated = await UserModel.addEmergencyContact(req.user.id, {
      name,
      relation: relation || "Contact",
      phone,
      notifyOnSOS: notifyOnSOS ?? true,
      priority: priority || 1,
    });
    return res.json({ message: "Emergency contact added", user: updated });
  },
  async removeEmergencyContact(req, res) {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { contactId } = req.params;
    const updated = await UserModel.removeEmergencyContact(
      req.user.id,
      contactId,
    );
    return res.json({ message: "Contact removed", user: updated });
  },
};
