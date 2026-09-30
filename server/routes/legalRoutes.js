import { Router } from "express";
import { legalController } from "../controllers/legalController.js";
const router = Router();
router.get("/rights", legalController.getRights);
router.get("/rights/:id", legalController.getRightById);
router.post("/complaint-draft", legalController.generateComplaintDraft);
export default router;
