import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthedRequest } from "../middleware/authenticate";

export async function scheduleClass(req: AuthedRequest, res: Response) {
  const { courseId, title, scheduledAt, durationMin } = req.body;
  const course = await prisma.course.findFirst({ where: { id: courseId, teacherId: req.user!.id } });
  if (!course) return res.status(404).json({ error: "Course not found" });

  const liveClass = await prisma.liveClass.create({
    data: { courseId, title, scheduledAt: new Date(scheduledAt), durationMin: durationMin ?? 60 },
  });
  res.status(201).json({ liveClass });
}

export async function getUpcomingClasses(req: AuthedRequest, res: Response) {
  const classes = await prisma.liveClass.findMany({
    where: { course: { teacherId: req.user!.id }, scheduledAt: { gte: new Date() }, status: "SCHEDULED" },
    include: { course: { select: { title: true } } },
    orderBy: { scheduledAt: "asc" },
  });
  res.json({ classes });
}

export async function updateClassStatus(req: AuthedRequest, res: Response) {
  const { status } = req.body;
  const liveClass = await prisma.liveClass.findFirst({
    where: { id: req.params.id, course: { teacherId: req.user!.id } },
  });
  if (!liveClass) return res.status(404).json({ error: "Class not found" });

  const updated = await prisma.liveClass.update({ where: { id: req.params.id }, data: { status } });
  res.json({ liveClass: updated });
}
