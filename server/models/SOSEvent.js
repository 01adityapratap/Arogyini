import { db } from "../config/db.js";
export const SOSEventModel = {
  async findAll() {
    return [...db.sosEvents];
  },
  async findByUserId(userId) {
    return db.sosEvents.filter((e) => e.userId === userId);
  },
  async create(eventData) {
    const newEvent = {
      ...eventData,
      id: `sos_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };
    db.sosEvents.unshift(newEvent);
    return newEvent;
  },
  async updateStatus(id, status, notes) {
    const event = db.sosEvents.find((e) => e.id === id);
    if (!event) return null;
    event.status = status;
    if (notes) event.notes = notes;
    if (status === "resolved" || status === "cancelled") {
      event.resolvedAt = new Date().toISOString();
    }
    return event;
  },
};
