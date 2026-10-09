import type { Request, Response } from "express";
import { Prisma, ScheduleStatus } from "@prisma/client";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../shared/async-handler.js";
import { badRequest, forbidden, notFound } from "../../shared/errors.js";
import { pageArgs, paginationSchema } from "../../shared/pagination.js";
import { sendData, sendList } from "../../shared/responses.js";
import { scheduleCreateSchema, scheduleUpdateSchema } from "./schemas.js";
import { z } from "zod";
import { pathParam } from "../../shared/path-param.js";

const scheduleSelect = {
  id: true,
  subject: { select: { id: true, name: true, slug: true } },
  teacher: { select: { id: true, user: { select: { id: true, name: true } } } },
  startsAt: true,
  endsAt: true,
  capacity: true,
  status: true,
  _count: { select: { bookings: { where: { status: { in: ["PENDING", "CONFIRMED"] } } } } },
  createdAt: true,
} satisfies Prisma.ScheduleSelect;

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = paginationSchema.parse(req.query);
  const subjectId = typeof req.query.subjectId === "string" ? req.query.subjectId : undefined;
  const teacherId = typeof req.query.teacherId === "string" ? req.query.teacherId : undefined;
  const status = req.query.status === undefined
    ? ScheduleStatus.ACTIVE
    : z.nativeEnum(ScheduleStatus).parse(req.query.status);
  const where = {
    status,
    ...(subjectId ? { subjectId } : {}),
    ...(teacherId ? { teacherId } : {}),
  };
  const [items, total] = await Promise.all([
    prisma.schedule.findMany({ where, select: scheduleSelect, ...pageArgs(page, limit), orderBy: { startsAt: "asc" } }),
    prisma.schedule.count({ where }),
  ]);
  sendList(res, items, page, limit, total);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.schedule.findUnique({ where: { id }, select: scheduleSelect });
  if (!item) throw notFound("No se encontró el horario");
  sendData(res, item);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const input = scheduleCreateSchema.parse(req.body);
  if (req.authUser?.role === "TEACHER") {
    const profile = await prisma.teacherProfile.findUnique({
      where: { userId: req.authUser.id },
      select: { id: true },
    });
    if (!profile || profile.id !== input.teacherId) {
      throw forbidden("Solo puedes crear horarios para tu propio perfil");
    }
  }
  const [subject, teacher] = await Promise.all([
    prisma.subject.findUnique({ where: { id: input.subjectId }, select: { isActive: true } }),
    prisma.teacherProfile.findUnique({
      where: { id: input.teacherId },
      select: {
        isActive: true,
        user: { select: { isActive: true } },
        specialties: { where: { subjectId: input.subjectId }, select: { subjectId: true } },
      },
    }),
  ]);
  if (!subject?.isActive || !teacher?.isActive || !teacher.user.isActive) {
    throw badRequest("La materia y el profesor deben estar activos");
  }
  if (!teacher.specialties.length) throw badRequest("El profesor no tiene asignada esta especialidad");
  const item = await prisma.schedule.create({ data: input, select: scheduleSelect });
  sendData(res, item, 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const input = scheduleUpdateSchema.parse(req.body);
  const id = pathParam(req, "id");
  const current = await prisma.schedule.findUnique({ where: { id } });
  if (!current) throw notFound("No se encontró el horario");
  const teacherId = input.teacherId ?? current.teacherId;
  const subjectId = input.subjectId ?? current.subjectId;
  if (req.authUser?.role === "TEACHER") {
    const profile = await prisma.teacherProfile.findUnique({
      where: { userId: req.authUser.id },
      select: { id: true },
    });
    if (!profile || teacherId !== profile.id) {
      throw forbidden("Solo puedes mantener horarios asignados a tu propio perfil");
    }
  }
  const startsAt = input.startsAt ?? current.startsAt;
  const endsAt = input.endsAt ?? current.endsAt;
  if (endsAt <= startsAt) throw badRequest("La hora de finalización debe ser posterior al inicio");
  const [subject, teacher] = await Promise.all([
    prisma.subject.findUnique({ where: { id: subjectId }, select: { isActive: true } }),
    prisma.teacherProfile.findUnique({
      where: { id: teacherId },
      select: {
        isActive: true,
        user: { select: { isActive: true } },
        specialties: { where: { subjectId }, select: { subjectId: true } },
      },
    }),
  ]);
  if (!subject?.isActive || !teacher?.isActive || !teacher.user.isActive) {
    throw badRequest("La materia y el profesor deben estar activos");
  }
  if (!teacher.specialties.length) throw badRequest("El profesor no tiene asignada esta especialidad");
  const activeBookings = await prisma.booking.count({
    where: { scheduleId: current.id, status: { in: ["PENDING", "CONFIRMED"] } },
  });
  if (input.capacity !== undefined && input.capacity < activeBookings) {
    throw badRequest("El cupo no puede ser menor al número de reservas activas");
  }
  const item = await prisma.schedule.update({ where: { id: current.id }, data: input, select: scheduleSelect });
  sendData(res, item);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.schedule.update({
    where: { id },
    data: { status: ScheduleStatus.INACTIVE },
    select: scheduleSelect,
  });
  sendData(res, item);
});
