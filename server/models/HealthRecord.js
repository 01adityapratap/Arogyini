import { db } from "../config/db.js";
export const HealthRecordModel = {
  async findByUserId(userId) {
    return db.healthRecords.filter((r) => r.userId === userId);
  },
  async create(recordData) {
    const newRecord = {
      ...recordData,
      id: `hr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };
    db.healthRecords.unshift(newRecord);
    return newRecord;
  },
  async delete(id, userId) {
    const index = db.healthRecords.findIndex(
      (r) => r.id === id && r.userId === userId,
    );
    if (index === -1) return false;
    db.healthRecords.splice(index, 1);
    return true;
  },
};
