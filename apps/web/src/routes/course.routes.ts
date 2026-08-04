import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { requireRole } from "../middleware/requireRole";
import {
  createCourse, getMyCourses, getCourseById, updateCourse, deleteCourse, createChapter,
} from "../controllers/course.controller";

const router = Router();
router.use(authenticate, requireRole("TEACHER"));

router.post("/", createCourse);
router.get("/", getMyCourses);
router.get("/:id", getCourseById);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.post("/:courseId/chapters", createChapter);

export default router;
