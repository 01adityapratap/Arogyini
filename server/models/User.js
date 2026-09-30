import { db } from "../config/db.js";
export const UserModel = {
  async findById(id) {
    const user = db.users.find((u) => u.id === id);
    return user ? { ...user } : null;
  },
  async findByEmail(email) {
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    return user ? { ...user } : null;
  },
  async create(userData) {
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "",
      role: userData.role || "user",
      bloodGroup: userData.bloodGroup || "O+",
      location: userData.location || { city: "Bengaluru", state: "Karnataka" },
      emergencyContacts: userData.emergencyContacts || [],
      healthProfile: userData.healthProfile || {
        age: 22,
        cycleLength: 28,
        lastPeriodDate: new Date().toISOString().split("T")[0],
      },
      savedJobs: [],
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    return newUser;
  },
  async update(id, updates) {
    const index = db.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...updates };
    return db.users[index];
  },
  async addEmergencyContact(userId, contact) {
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;
    const newContact = {
      ...contact,
      id: `ec_${Date.now()}`,
    };
    user.emergencyContacts = [...user.emergencyContacts, newContact];
    return user;
  },
  async removeEmergencyContact(userId, contactId) {
    const user = db.users.find((u) => u.id === userId);
    if (!user) return null;
    user.emergencyContacts = user.emergencyContacts.filter(
      (c) => c.id !== contactId,
    );
    return user;
  },
};
