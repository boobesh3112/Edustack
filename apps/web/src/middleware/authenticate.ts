import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export interface AuthedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export async function authenticate(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing authentication token" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!) as { sub: string; email: string };

    const dbUser = await prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!dbUser) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = { id: dbUser.id, email: dbUser.email, role: dbUser.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
