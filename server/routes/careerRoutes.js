import { Router } from "express";
import { careerController } from "../controllers/careerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/jobs", careerController.getJobs);
router.get("/jobs/:id", careerController.getJobById);
router.get("/scholarships", careerController.getScholarships);
router.post(
  "/jobs/:jobId/save",
  authMiddleware,
  careerController.toggleSaveJob,
);
router.post("/jobs/:jobId/apply", authMiddleware, careerController.applyJob);
export default router;
