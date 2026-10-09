import type { Request, Response } from "express";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../shared/async-handler.js";
import { notFound } from "../../shared/errors.js";
import { activeFilterSchema, pageArgs, paginationSchema } from "../../shared/pagination.js";
import { sendData, sendList } from "../../shared/responses.js";
import { pathParam } from "../../shared/path-param.js";
import { planCreateSchema, planUpdateSchema } from "./schemas.js";

const planSelect = {
  id: true,
  subject: { select: { id: true, name: true } },
  name: true,
  description: true,
  price: true,
  sessionCount: true,
  isActive: true,
  createdAt: true,
} as const;

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = paginationSchema.parse(req.query);
  const { active } = activeFilterSchema.parse(req.query);
  const subjectId = typeof req.query.subjectId === "string" ? req.query.subjectId : undefined;
  const where = {
    ...(active === "all" ? {} : { isActive: active === "true" }),
    ...(subjectId ? { subjectId } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.plan.findMany({ where, select: planSelect, ...pageArgs(page, limit), orderBy: { price: "asc" } }),
    prisma.plan.count({ where }),
  ]);
  sendList(res, items, page, limit, total);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.plan.findUnique({ where: { id }, select: planSelect });
  if (!item) throw notFound("No se encontró el plan");
  sendData(res, item);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const item = await prisma.plan.create({ data: planCreateSchema.parse(req.body), select: planSelect });
  sendData(res, item, 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.plan.update({
    where: { id },
    data: planUpdateSchema.parse(req.body),
    select: planSelect,
  });
  sendData(res, item);
});
