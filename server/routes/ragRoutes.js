import { Router } from "express";
import { ragController } from "../controllers/ragController.js";
const router = Router();
router.post("/query", ragController.query);
router.get("/status", ragController.getStatus);
export default router;
