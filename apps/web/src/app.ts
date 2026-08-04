import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import materialRoutes from "./routes/material.routes";
import liveClassRoutes from "./routes/liveclass.routes";
export const app = express();
app.use("/api/courses", courseRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/live-classes", liveClassRoutes);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));
