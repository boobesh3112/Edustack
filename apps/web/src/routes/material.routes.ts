import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { requireRole } from "../middleware/requireRole";
import { getUploadUrl, registerMaterial, deleteMaterial } from "../controllers/material.controller";

const router = Router();
router.use(authenticate, requireRole("TEACHER"));

router.post("/upload-url", getUploadUrl);
router.post("/", registerMaterial);
router.delete("/:id", deleteMaterial);

export default router;
