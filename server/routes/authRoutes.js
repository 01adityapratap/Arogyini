import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.put("/profile", authMiddleware, authController.updateProfile);
router.post(
  "/emergency-contacts",
  authMiddleware,
  authController.addEmergencyContact,
);
router.delete(
  "/emergency-contacts/:contactId",
  authMiddleware,
  authController.removeEmergencyContact,
);
export default router;
