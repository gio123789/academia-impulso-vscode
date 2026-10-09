import type { Request, Response } from "express";
import { PaymentStatus, UserRole } from "@prisma/client";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../shared/async-handler.js";
import { forbidden, notFound, badRequest } from "../../shared/errors.js";
import { pageArgs, paginationSchema } from "../../shared/pagination.js";
import { sendData, sendList } from "../../shared/responses.js";
import { paymentCreateSchema, paymentStatusSchema } from "./schemas.js";
import { z } from "zod";
import { pathParam } from "../../shared/path-param.js";

const select = {
  id: true,
  student: { select: { id: true, name: true, email: true } },
  plan: { select: { id: true, name: true, sessionCount: true } },
  amount: true,
  externalReference: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = paginationSchema.parse(req.query);
  const user = req.authUser!;
  const requestedStudentId = typeof req.query.studentId === "string" ? req.query.studentId : undefined;
  const where = user.role === UserRole.ADMIN
    ? (requestedStudentId ? { studentId: requestedStudentId } : {})
    : { studentId: user.id };
  const status = req.query.status === undefined ? undefined : z.nativeEnum(PaymentStatus).parse(req.query.status);
  const filtered = status ? { ...where, status } : where;
  const [items, total] = await Promise.all([
    prisma.payment.findMany({ where: filtered, select, ...pageArgs(page, limit), orderBy: { createdAt: "desc" } }),
    prisma.payment.count({ where: filtered }),
  ]);
  sendList(res, items, page, limit, total);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.payment.findUnique({ where: { id }, select });
  if (!item) throw notFound("No se encontró el pago");
  if (req.authUser!.role !== UserRole.ADMIN && item.student.id !== req.authUser!.id) {
    throw forbidden("Solo puedes consultar tus propios pagos");
  }
  sendData(res, item);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  if (req.authUser!.role !== UserRole.STUDENT) throw forbidden("Solo estudiantes pueden registrar pagos");
  const input = paymentCreateSchema.parse(req.body);
  const plan = await prisma.plan.findUnique({ where: { id: input.planId } });
  if (!plan?.isActive) throw badRequest("El plan no está disponible");
  const item = await prisma.payment.create({
    data: {
      studentId: req.authUser!.id,
      planId: plan.id,
      amount: plan.price,
      externalReference: input.externalReference,
    },
    select,
  });
  sendData(res, item, 201);
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = paymentStatusSchema.parse(req.body);
  const id = pathParam(req, "id");
  const exists = await prisma.payment.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw notFound("No se encontró el pago");
  const item = await prisma.payment.update({ where: { id: exists.id }, data: { status }, select });
  sendData(res, item);
});
