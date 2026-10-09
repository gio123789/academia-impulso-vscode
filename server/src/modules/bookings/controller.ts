import type { Request, Response } from "express";
import { BookingStatus, Prisma, ScheduleStatus, UserRole } from "@prisma/client";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../shared/async-handler.js";
import { badRequest, conflict, forbidden, notFound } from "../../shared/errors.js";
import { pageArgs, paginationSchema } from "../../shared/pagination.js";
import { sendData, sendList } from "../../shared/responses.js";
import { bookingCreateSchema, bookingStatusSchema } from "./schemas.js";
import { pathParam } from "../../shared/path-param.js";

const bookingSelect = {
  id: true,
  status: true,
  createdAt: true,
  student: { select: { id: true, name: true, email: true } },
  schedule: {
    select: {
      id: true,
      startsAt: true,
      endsAt: true,
      status: true,
      subject: { select: { id: true, name: true } },
      teacher: { select: { id: true, user: { select: { id: true, name: true } } } },
    },
  },
} as const;
const occupiedStatuses = [BookingStatus.PENDING, BookingStatus.CONFIRMED];

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit } = paginationSchema.parse(req.query);
  const auth = req.authUser!;
  const status = req.query.status === undefined ? undefined : bookingStatusSchema.shape.status.parse(req.query.status);
  let where: Prisma.BookingWhereInput = {};
  if (auth.role === UserRole.STUDENT) where.studentId = auth.id;
  else if (auth.role === UserRole.GUARDIAN) {
    where.student = { studentLinks: { some: { guardianId: auth.id } } };
  } else if (auth.role === UserRole.TEACHER) {
    const teacher = await prisma.teacherProfile.findUnique({ where: { userId: auth.id }, select: { id: true } });
    if (!teacher) {
      sendList(res, [], page, limit, 0);
      return;
    }
    where.schedule = { teacherId: teacher.id };
  }
  if (auth.role !== UserRole.ADMIN && typeof req.query.studentId === "string") {
    if (auth.role !== UserRole.GUARDIAN) throw forbidden("No puedes consultar reservas de otro estudiante");
    where.studentId = req.query.studentId;
    where.student = { studentLinks: { some: { guardianId: auth.id } } };
  } else if (auth.role === UserRole.ADMIN && typeof req.query.studentId === "string") {
    where.studentId = req.query.studentId;
  }
  if (typeof req.query.scheduleId === "string") where.scheduleId = req.query.scheduleId;
  if (status) where.status = status;
  const [items, total] = await Promise.all([
    prisma.booking.findMany({ where, select: bookingSelect, ...pageArgs(page, limit), orderBy: { createdAt: "desc" } }),
    prisma.booking.count({ where }),
  ]);
  sendList(res, items, page, limit, total);
});

export const get = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const item = await prisma.booking.findUnique({ where: { id }, select: bookingSelect });
  if (!item) throw notFound("No se encontró la reserva");
  await ensureCanView(req, item.student.id, item.schedule.teacher.id);
  sendData(res, item);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const { scheduleId } = bookingCreateSchema.parse(req.body);
  const studentId = req.authUser!.id;
  const studentProfile = await prisma.studentProfile.findUnique({ where: { userId: studentId }, select: { id: true } });
  if (!studentProfile) throw badRequest("Completa el perfil escolar antes de reservar");
  try {
    const item = await prisma.$transaction(async (tx) => {
      const schedule = await tx.schedule.findUnique({ where: { id: scheduleId } });
      if (!schedule || schedule.status !== ScheduleStatus.ACTIVE) {
        throw badRequest("El horario no está disponible");
      }
      if (schedule.startsAt <= new Date()) throw badRequest("No se puede reservar un horario pasado");
      const occupied = await tx.booking.count({
        where: { scheduleId, status: { in: occupiedStatuses } },
      });
      if (occupied >= schedule.capacity) throw conflict("El horario ya alcanzó su cupo máximo");
      const existing = await tx.booking.findUnique({
        where: { studentId_scheduleId: { studentId, scheduleId } },
        select: { id: true, status: true },
      });
      if (existing && existing.status !== BookingStatus.CANCELLED) {
        throw conflict("Ya tienes una reserva para este horario");
      }
      if (existing) {
        return tx.booking.update({
          where: { id: existing.id },
          data: { status: BookingStatus.PENDING },
          select: bookingSelect,
        });
      }
      return tx.booking.create({
        data: { studentId, scheduleId },
        select: bookingSelect,
      });
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    sendData(res, item, 201);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw conflict("Ya tienes una reserva para este horario");
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034") {
      throw conflict("El horario cambió mientras se procesaba la reserva; inténtalo de nuevo");
    }
    throw error;
  }
});

export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = bookingStatusSchema.parse(req.body);
  const id = pathParam(req, "id");
  const current = await prisma.booking.findUnique({
    where: { id },
    select: { id: true, studentId: true, schedule: { select: { teacherId: true } } },
  });
  if (!current) throw notFound("No se encontró la reserva");
  const role = req.authUser!.role;
  if (role === UserRole.STUDENT) {
    if (current.studentId !== req.authUser!.id) throw forbidden("Solo puedes gestionar tus propias reservas");
    if (status !== BookingStatus.CANCELLED) throw forbidden("Solo puedes cancelar tus reservas");
  } else if (role === UserRole.TEACHER) {
    const profile = await prisma.teacherProfile.findUnique({ where: { userId: req.authUser!.id }, select: { id: true } });
    if (profile?.id !== current.schedule.teacherId) throw forbidden("Solo puedes gestionar las reservas de tus horarios");
  }
  const item = await prisma.booking.update({ where: { id: current.id }, data: { status }, select: bookingSelect });
  sendData(res, item);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const id = pathParam(req, "id");
  const current = await prisma.booking.findUnique({ where: { id }, select: { id: true, studentId: true } });
  if (!current) throw notFound("No se encontró la reserva");
  if (req.authUser!.role !== UserRole.ADMIN && current.studentId !== req.authUser!.id) {
    throw forbidden("Solo puedes cancelar tus propias reservas");
  }
  const item = await prisma.booking.update({
    where: { id: current.id },
    data: { status: BookingStatus.CANCELLED },
    select: bookingSelect,
  });
  sendData(res, item);
});

async function ensureCanView(req: Request, studentId: string, teacherId: string): Promise<void> {
  const auth = req.authUser!;
  if (auth.role === UserRole.ADMIN || (auth.role === UserRole.STUDENT && auth.id === studentId)) return;
  if (auth.role === UserRole.TEACHER) {
    const profile = await prisma.teacherProfile.findUnique({ where: { userId: auth.id }, select: { id: true } });
    if (profile?.id === teacherId) return;
  }
  if (auth.role === UserRole.GUARDIAN) {
    const relation = await prisma.studentGuardian.findUnique({
      where: { studentId_guardianId: { studentId, guardianId: auth.id } },
      select: { studentId: true },
    });
    if (relation) return;
  }
  throw forbidden("No tienes permiso para consultar esta reserva");
}
