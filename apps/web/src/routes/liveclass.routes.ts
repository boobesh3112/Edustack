import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { requireRole } from "../middleware/requireRole";
import { scheduleClass, getUpcomingClasses, updateClassStatus } from "../controllers/liveclass.controller";

const router = Router();
router.use(authenticate, requireRole("TEACHER"));

router.post("/", scheduleClass);
router.get("/upcoming", getUpcomingClasses);
router.patch("/:id/status", updateClassStatus);

export default router;
