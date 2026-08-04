import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthedRequest } from "../middleware/authenticate";

// Called right after Supabase signup completes on the frontend,
// to create the matching profile row with the chosen role.
export async function completeProfile(req: AuthedRequest, res: Response) {
  const { id, email, fullName, role } = req.body;

  if (!id || !email || !fullName || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!["TEACHER", "STUDENT", "ADMIN"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const user = await prisma.user.upsert({
    where: { id },
    update: { fullName },
    create: { id, email, fullName, role },
  });

  res.status(201).json({ user });
}

export async function getMe(req: AuthedRequest, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  res.json({ user });
}
