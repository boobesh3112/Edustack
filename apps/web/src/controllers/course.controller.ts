import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthedRequest } from "../middleware/authenticate";

export async function createCourse(req: AuthedRequest, res: Response) {
  const { title, description, subject, gradeLevel } = req.body;
  if (!title || !subject) return res.status(400).json({ error: "Title and subject are required" });

  const course = await prisma.course.create({
    data: { title, description, subject, gradeLevel, teacherId: req.user!.id },
  });
  res.status(201).json({ course });
}

export async function getMyCourses(req: AuthedRequest, res: Response) {
  const courses = await prisma.course.findMany({
    where: { teacherId: req.user!.id },
    include: { _count: { select: { enrollments: true, materials: true, liveClasses: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json({ courses });
}

export async function getCourseById(req: AuthedRequest, res: Response) {
  const course = await prisma.course.findFirst({
    where: { id: req.params.id, teacherId: req.user!.id },
    include: {
      chapters: { include: { materials: true }, orderBy: { order: "asc" } },
      liveClasses: { orderBy: { scheduledAt: "asc" } },
      enrollments: { include: { student: { select: { id: true, fullName: true, email: true } } } },
    },
  });
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json({ course });
}

export async function updateCourse(req: AuthedRequest, res: Response) {
  const existing = await prisma.course.findFirst({ where: { id: req.params.id, teacherId: req.user!.id } });
  if (!existing) return res.status(404).json({ error: "Course not found" });

  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ course });
}

export async function deleteCourse(req: AuthedRequest, res: Response) {
  const existing = await prisma.course.findFirst({ where: { id: req.params.id, teacherId: req.user!.id } });
  if (!existing) return res.status(404).json({ error: "Course not found" });

  await prisma.course.delete({ where: { id: req.params.id } });
  res.status(204).send();
}

export async function createChapter(req: AuthedRequest, res: Response) {
  const { title, order } = req.body;
  const course = await prisma.course.findFirst({ where: { id: req.params.courseId, teacherId: req.user!.id } });
  if (!course) return res.status(404).json({ error: "Course not found" });

  const chapter = await prisma.chapter.create({
    data: { title, order: order ?? 0, courseId: req.params.courseId },
  });
  res.status(201).json({ chapter });
}
