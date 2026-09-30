import { Router } from "express";
import { sosController } from "../controllers/sosController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/trigger", authMiddleware, sosController.triggerSOS);
router.get("/events", authMiddleware, sosController.getEvents);
router.put("/events/:id/resolve", authMiddleware, sosController.resolveSOS);
router.get("/safe-zones", authMiddleware, sosController.getSafeZones);
export default router;
