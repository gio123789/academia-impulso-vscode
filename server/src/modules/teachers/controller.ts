import type { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../shared/async-handler.js";
import { activeFilterSchema, pageArgs, paginationSchema } from "../../shared/pagination.js";
import { notFound } from "../../shared/errors.js";
import { sendData, sendList } from "../../shared/responses.js";
import { pathParam } from "../../shared/path-param.js";
import { teacherCreateSchema, teacherUpdateSchema } from "./schemas.js";

const profileSelect = {
  id: true,
  biography: true,
  isActive: true,
  user: { select: { id: true, name: true, email: true, phone: true, isActive: true } },
  specialties: { include: { subject: true } },
  createdAt: true,
} as const;

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = paginationSchema.parse(req.query);
  const { active } = activeFilterSchema.parse(req.query);
  const where = active === "all" ? {} : { isActive: active === "true" };
  const [items, total] = await Promise.all([
    prisma.teacherProfile.findMany({ where, select: profileSelect, ...pageArgs(page, limit), orderBy: { createdAt: "desc" } }),
    prisma.teacherProfile.count({ where }),
  ]);
  sendList(res, items, page, limit, total);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.teacherProfile.findUnique({ where: { id }, select: profileSelect });
  if (!item) throw notFound("No se encontró el profesor");
  sendData(res, item);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const input = teacherCreateSchema.parse(req.body);
  const passwordHash = await bcrypt.hash(input.password, 12);
  const item = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        phone: input.phone,
        passwordHash,
        role: UserRole.TEACHER,
      },
    });
    return tx.teacherProfile.create({
      data: {
        userId: user.id,
        biography: input.biography,
        specialties: { create: input.subjectIds.map((subjectId) => ({ subjectId })) },
      },
      select: profileSelect,
    });
  });
  sendData(res, item, 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const input = teacherUpdateSchema.parse(req.body);
  const { subjectIds, name, phone, biography, isActive } = input;
  const item = await prisma.$transaction(async (tx) => {
    const current = await tx.teacherProfile.findUnique({ where: { id }, select: { id: true, userId: true } });
    if (!current) throw notFound("No se encontró el profesor");
    if (subjectIds) {
      await tx.teacherSpecialty.deleteMany({ where: { teacherId: current.id } });
      await tx.teacherSpecialty.createMany({
        data: subjectIds.map((subjectId) => ({ teacherId: current.id, subjectId })),
        skipDuplicates: true,
      });
    }
    if (name !== undefined || phone !== undefined || isActive !== undefined) {
      await tx.user.update({
        where: { id: current.userId },
        data: { name, phone, ...(isActive !== undefined ? { isActive } : {}) },
      });
    }
    return tx.teacherProfile.update({
      where: { id: current.id },
      data: { biography, isActive },
      select: profileSelect,
    });
  });
  sendData(res, item);
});
