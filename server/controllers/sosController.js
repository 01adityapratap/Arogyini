import { SOSEventModel } from "../models/SOSEvent.js";
import { UserModel } from "../models/User.js";
import { NotificationService } from "../services/notificationService.js";
import { db } from "../config/db.js";
export const sosController = {
  async triggerSOS(req, res) {
    try {
      const userId = req.user?.id || "usr_default_01";
      const user =
        (await UserModel.findById(userId)) || req.user || db.users[0];
      const { latitude, longitude, accuracy, address, emergencyType, notes } =
        req.body;
      const contacts = user.emergencyContacts || [];
      // Create new active SOS event
      const newEvent = await SOSEventModel.create({
        userId: user.id,
        userName: user.name,
        userPhone: user.phone || "+91 98765 43210",
        timestamp: new Date().toISOString(),
        location: {
          latitude: Number(latitude) || 12.9716,
          longitude: Number(longitude) || 77.5946,
          accuracy: Number(accuracy) || 10,
          address: address || "Live Geolocation Pin - Central District",
        },
        status: "active",
        emergencyType: emergencyType || "general",
        notifiedContacts: contacts.map((c) => ({
          name: c.name,
          phone: c.phone,
          status: "delivered",
        })),
        policeNotified: true,
        policeStation:
          "Emergency Response Support System (ERSS 112 / Pink Patrol)",
        notes: notes || "1-Tap Emergency Trigger Activated by User",
      });
      // Dispatch simulated SMS & Police Dispatch
      const dispatchResults = await NotificationService.dispatchSOSEmergency(
        newEvent,
        contacts,
      );
      return res.status(201).json({
        message: "CRITICAL SOS ALERT BROADCASTED",
        sosEvent: newEvent,
        dispatchSummary: dispatchResults,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message || "Failed to trigger SOS" });
    }
  },
  async getEvents(req, res) {
    const userId = req.user?.id || "usr_default_01";
    const events = await SOSEventModel.findByUserId(userId);
    return res.json({ events });
  },
  async resolveSOS(req, res) {
    const { id } = req.params;
    const { notes, status } = req.body;
    const updated = await SOSEventModel.updateStatus(
      id,
      status || "resolved",
      notes || "Resolved safely by user",
    );
    return res.json({ message: "SOS event updated", event: updated });
  },
  async getSafeZones(req, res) {
    return res.json({ safeZones: db.safeZones });
  },
};
