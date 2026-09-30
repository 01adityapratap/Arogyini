import { Router } from "express";
import { mlController } from "../controllers/mlController.js";
const router = Router();
router.post("/predict-health", mlController.predictHealthRisk);
router.get("/audit-safety", mlController.auditSafetyRoute);
export default router;
