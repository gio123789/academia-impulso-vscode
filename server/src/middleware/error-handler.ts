import type { ErrorRequestHandler, RequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../shared/errors.js";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.path}`, 404, "ROUTE_NOT_FOUND"));
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: { code: error.code, message: error.message, ...(error.details ? { details: error.details } : {}) },
    });
    return;
  }
  if (
    error instanceof SyntaxError
    && "status" in error
    && error.status === 400
    && "type" in error
    && error.type === "entity.parse.failed"
  ) {
    res.status(400).json({
      success: false,
      error: { code: "INVALID_JSON", message: "El cuerpo de la solicitud debe ser JSON válido" },
    });
    return;
  }
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos enviados no son válidos",
        details: error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      },
    });
    return;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({ success: false, error: { code: "CONFLICT", message: "El recurso ya existe" } });
      return;
    }
    if (error.code === "P2025") {
      res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "No se encontró el recurso" } });
      return;
    }
    if (error.code === "P2003") {
      res.status(400).json({ success: false, error: { code: "INVALID_REFERENCE", message: "Una referencia no existe o no puede modificarse" } });
      return;
    }
    if (error.code === "P2000") {
      res.status(400).json({ success: false, error: { code: "BAD_REQUEST", message: "Uno de los datos excede el límite permitido" } });
      return;
    }
  }
  console.error("Error no controlado en API:", error);
  res.status(500).json({
    success: false,
    error: { code: "INTERNAL_SERVER_ERROR", message: "Ocurrió un error interno" },
  });
};
