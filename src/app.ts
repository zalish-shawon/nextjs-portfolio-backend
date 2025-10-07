import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import projectRoutes from "./routes/project.routes";
import { errorHandler } from "./middlewares/error.middleware";


dotenv.config();


const app = express();


// Middlewares
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));


app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);


// Health check
app.get("/ping", (req, res) => res.json({ ok: true, ts: Date.now() }));
app.get('/', (_req, res) => {
  res.json({'message': 'Portfolio APIs is running 🚀'});
});

// Error handler
app.use(errorHandler);


export default app;