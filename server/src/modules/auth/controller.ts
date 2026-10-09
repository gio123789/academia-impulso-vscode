import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/async-handler.js";
import { sendData } from "../../shared/responses.js";
import { loginSchema, registerSchema } from "./schemas.js";
import * as service from "./service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.register(registerSchema.parse(req.body));
  sendData(res, result, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  sendData(res, await service.login(loginSchema.parse(req.body)));
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  sendData(res, await service.getCurrentUser(req.authUser!.id));
});
