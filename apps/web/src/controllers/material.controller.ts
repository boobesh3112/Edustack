import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthedRequest } from "../middleware/authenticate";
import { createSignedUploadUrl, getPublicUrl } from "../lib/storage";

// Step 1: frontend requests a signed URL to upload directly to Supabase Storage
export async function getUploadUrl(req: AuthedRequest, res: Response) {
  const { courseId, fileName } = req.body;
  const course = await prisma.course.findFirst({ where: { id: courseId, teacherId: req.user!.id } });
  if (!course) return res.status(404).json({ error: "Course not found" });

  const path = `${courseId}/${Date.now()}-${fileName}`;
  const signed = await createSignedUploadUrl(path);
  res.json({ ...signed, path });
}

// Step 2: after successful upload, frontend registers the material record
export async function registerMaterial(req: AuthedRequest, res: Response) {
  const { title, type, path, courseId, chapterId, fileSize } = req.body;
  const course = await prisma.course.findFirst({ where: { id: courseId, teacherId: req.user!.id } });
  if (!course) return res.status(404).json({ error: "Course not found" });

  const material = await prisma.material.create({
    data: { title, type, fileUrl: getPublicUrl(path), fileSize, courseId, chapterId },
  });
  res.status(201).json({ material });
}

export async function deleteMaterial(req: AuthedRequest, res: Response) {
  const material = await prisma.material.findFirst({
    where: { id: req.params.id, course: { teacherId: req.user!.id } },
  });
  if (!material) return res.status(404).json({ error: "Material not found" });

  await prisma.material.delete({ where: { id: req.params.id } });
  res.status(204).send();
}
