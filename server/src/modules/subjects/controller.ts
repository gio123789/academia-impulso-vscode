import type { Request, Response } from "express";
import { prisma } from "../../config/database.js";
import { activeFilterSchema, pageArgs, paginationSchema } from "../../shared/pagination.js";
import { asyncHandler } from "../../shared/async-handler.js";
import { notFound } from "../../shared/errors.js";
import { sendData, sendList } from "../../shared/responses.js";
import { pathParam } from "../../shared/path-param.js";
import { subjectCreateSchema, subjectUpdateSchema } from "./schemas.js";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = paginationSchema.parse(req.query);
  const { active } = activeFilterSchema.parse(req.query);
  const where = active === "all" ? {} : { isActive: active === "true" };
  const [items, total] = await Promise.all([
    prisma.subject.findMany({ where, ...pageArgs(page, limit), orderBy: { name: "asc" } }),
    prisma.subject.count({ where }),
  ]);
  sendList(res, items, page, limit, total);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.subject.findUnique({ where: { id } });
  if (!item) throw notFound("No se encontró la materia");
  sendData(res, item);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const item = await prisma.subject.create({ data: subjectCreateSchema.parse(req.body) });
  sendData(res, item, 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.subject.update({
    where: { id },
    data: subjectUpdateSchema.parse(req.body),
  });
  sendData(res, item);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.subject.update({
    where: { id },
    data: { isActive: false },
  });
  sendData(res, item);
});
