import { HealthRecordModel } from "../models/HealthRecord.js";
import { MLService } from "../services/mlService.js";
export const healthController = {
  async getRecords(req, res) {
    const userId = req.user?.id || "usr_default_01";
    const records = await HealthRecordModel.findByUserId(userId);
    return res.json({ records });
  },
  async addRecord(req, res) {
    const userId = req.user?.id || "usr_default_01";
    const { type, title, details, date } = req.body;
    const newRecord = await HealthRecordModel.create({
      userId,
      type: type || "period",
      title: title || "Health Log",
      date: date || new Date().toISOString().split("T")[0],
      details: details || {},
    });
    return res
      .status(201)
      .json({ message: "Health record saved", record: newRecord });
  },
  async deleteRecord(req, res) {
    const userId = req.user?.id || "usr_default_01";
    const { id } = req.params;
    const success = await HealthRecordModel.delete(id, userId);
    return res.json({ success });
  },
  async predictRisk(req, res) {
    try {
      const input = req.body;
      const result = await MLService.predictHealthRisk(input);
      return res.json(result);
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message || "Prediction failed" });
    }
  },
  async getCycleSummary(req, res) {
    const user = req.user;
    const cycleLength = user?.healthProfile?.cycleLength || 28;
    const lastPeriod = user?.healthProfile?.lastPeriodDate || "2026-08-10";
    const lastDate = new Date(lastPeriod);
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + cycleLength);
    const ovulationDate = new Date(lastDate);
    ovulationDate.setDate(lastDate.getDate() + Math.round(cycleLength / 2));
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const currentDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let currentPhase = "Follicular Phase";
    if (currentDay <= 5) currentPhase = "Menstrual Phase";
    else if (currentDay >= 12 && currentDay <= 16)
      currentPhase = "Ovulation Phase";
    else if (currentDay > 16) currentPhase = "Luteal Phase";
    return res.json({
      currentCycleDay: currentDay % cycleLength || 1,
      currentPhase,
      cycleLength,
      lastPeriodDate: lastPeriod,
      nextPredictedPeriod: nextDate.toISOString().split("T")[0],
      predictedOvulation: ovulationDate.toISOString().split("T")[0],
      insights: [
        "Hormone levels are balanced. Estrogen rises in follicular phase boosting energy.",
        "Recommended nutrition: Magnesium-rich seeds, leafy dark greens, and hydration.",
      ],
    });
  },
};
