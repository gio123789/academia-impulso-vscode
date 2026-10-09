import type { Request } from "express";
import { badRequest } from "./errors.js";

export function pathParam(req: Request, name: string): string {
  const value = req.params[name];
  if (typeof value !== "string" || value.length === 0) {
    throw badRequest(`Parámetro de ruta inválido: ${name}`);
  }
  return value;
}
