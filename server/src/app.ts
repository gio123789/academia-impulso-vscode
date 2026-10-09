import "./config/env.js";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env, corsOrigins } from "./config/env.js";
import { AppError } from "./shared/errors.js";
import subjectRoutes from "./modules/subjects/routes.js";
import scheduleRoutes from "./modules/schedules/routes.js";
import contactRoutes from "./modules/contact/routes.js";
import { notFoundHandler, errorHandler } from "./middleware/error-handler.js";

export const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || corsOrigins.includes("*") || corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new AppError("Origen no permitido por CORS", 403, "CORS_FORBIDDEN"));
  },
}));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      error: { code: "RATE_LIMITED", message: "Demasiadas solicitudes; inténtalo más tarde" },
    });
  },
}));

app.use("/api/subjects", subjectRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/contact", contactRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
