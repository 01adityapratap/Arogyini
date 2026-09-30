import { MLService } from "../services/mlService.js";
export const mlController = {
  async predictHealthRisk(req, res) {
    try {
      const result = await MLService.predictHealthRisk(req.body);
      return res.json(result);
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message || "ML Health Prediction failed" });
    }
  },
  async auditSafetyRoute(req, res) {
    try {
      const { lat, lng } = req.query;
      const result = await MLService.calculateSafetyScore(
        Number(lat) || 12.9716,
        Number(lng) || 77.5946,
      );
      return res.json(result);
    } catch (err) {
      return res
        .status(500)
        .json({ error: err.message || "Safety route audit failed" });
    }
  },
};
