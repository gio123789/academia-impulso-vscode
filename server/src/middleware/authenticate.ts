import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../config/database.js";
import { unauthorized } from "../shared/errors.js";

export type AuthUser = {
  id: string;
  role: "ADMIN" | "TEACHER" | "STUDENT" | "GUARDIAN";
};

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthUser;
    }
  }
}

export const authenticate: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.header("authorization");
    if (!header?.startsWith("Bearer ")) throw unauthorized();
    const token = header.slice(7);
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (typeof payload === "string" || !payload.sub || !payload.role) {
      throw unauthorized("Token inválido");
    }
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true, isActive: true },
    });
    if (!user?.isActive || user.role !== payload.role) throw unauthorized("Token inválido");
    req.authUser = { id: user.id, role: user.role };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      next(unauthorized("Token inválido o expirado"));
      return;
    }
    next(error);
  }
};
