import type { RequestHandler } from "express";
import type { AuthUser } from "./authenticate.js";
import { forbidden, unauthorized } from "../shared/errors.js";

type UserRole = AuthUser["role"];

export function authorize(...roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.authUser) {
      next(unauthorized());
      return;
    }
    if (!roles.includes(req.authUser.role)) {
      next(forbidden());
      return;
    }
    next();
  };
}
