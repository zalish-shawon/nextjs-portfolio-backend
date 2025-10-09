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
import aboutRoutes from "./routes/about.routes";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// ✅ Allowed origins
const allowedOrigins = [
  "https://nextjs-portfolio-frontend-gold.vercel.app",
  "http://localhost:3000",
];

// ✅ CORS setup (must match frontend domain exactly)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow e.g. Postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS not allowed for this origin"), false);
    },
    credentials: true, // allow sending cookies
  })
);

// ✅ Handle preflight requests properly (important for Vercel HTTPS)
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ Rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/about", aboutRoutes);

// ✅ Health check
app.get("/ping", (req, res) => res.json({ ok: true, ts: Date.now() }));
app.get("/", (_req, res) => {
  res.json({ message: "Portfolio APIs running 🚀" });
});

// ✅ Error handler
app.use(errorHandler);

export default app;
