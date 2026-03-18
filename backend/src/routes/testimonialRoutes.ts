import { Router } from "express";
import {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = Router();

// Public routes
router.get("/", getTestimonials);

// Protected routes (admin only)
router.get("/all", protect, getAllTestimonials);
router.post("/", protect, upload.single("avatar"), createTestimonial);
router.put("/:id", protect, upload.single("avatar"), updateTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;
