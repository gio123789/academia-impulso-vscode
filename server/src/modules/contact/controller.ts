import type { Request, Response } from "express";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../shared/async-handler.js";
import { badRequest, notFound } from "../../shared/errors.js";
import { pageArgs, paginationSchema } from "../../shared/pagination.js";
import { sendData, sendList } from "../../shared/responses.js";
import { contactCreateSchema, contactStatusSchema } from "./schemas.js";
import { ContactStatus } from "@prisma/client";
import { z } from "zod";
import { pathParam } from "../../shared/path-param.js";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const input = contactCreateSchema.parse(req.body);
  let subjectId = input.subjectId;
  if (input.subjectSlug) {
    const subject = await prisma.subject.findUnique({ where: { slug: input.subjectSlug }, select: { id: true, isActive: true } });
    if (!subject?.isActive) throw badRequest("La materia seleccionada no está disponible");
    subjectId = subject.id;
  }
  if (subjectId) {
    const subject = await prisma.subject.findUnique({ where: { id: subjectId }, select: { isActive: true } });
    if (!subject?.isActive) throw badRequest("La materia seleccionada no está disponible");
  }
  const item = await prisma.contactRequest.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      subjectId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      message: true,
      subject: { select: { id: true, name: true } },
      status: true,
      createdAt: true,
    },
  });
  sendData(res, item, 201);
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = paginationSchema.parse(req.query);
  const status = req.query.status === undefined ? undefined : z.nativeEnum(ContactStatus).parse(req.query.status);
  const where = status ? { status } : {};
  const [items, total] = await Promise.all([
    prisma.contactRequest.findMany({
      where,
      select: {
        id: true, name: true, email: true, phone: true, message: true, status: true, createdAt: true,
        subject: { select: { id: true, name: true } },
      },
      ...pageArgs(page, limit),
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactRequest.count({ where }),
  ]);
  sendList(res, items, page, limit, total);
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = contactStatusSchema.parse(req.body);
  const id = pathParam(req, "id");
  const exists = await prisma.contactRequest.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw notFound("No se encontró la solicitud de contacto");
  const item = await prisma.contactRequest.update({
    where: { id: exists.id },
    data: { status },
    select: { id: true, status: true, updatedAt: true },
  });
  sendData(res, item);
});
