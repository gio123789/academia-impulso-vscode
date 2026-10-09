import { ScheduleStatus } from "@prisma/client";
import { z } from "zod";

const date = z.coerce.date();
export const scheduleCreateSchema = z.object({
  subjectId: z.string().min(1),
  teacherId: z.string().min(1),
  startsAt: date,
  endsAt: date,
  capacity: z.number().int().min(1).max(100),
  status: z.nativeEnum(ScheduleStatus).optional(),
}).refine((input) => input.endsAt > input.startsAt, {
  path: ["endsAt"],
  message: "La hora de finalización debe ser posterior al inicio",
});
export const scheduleUpdateSchema = z.object({
  subjectId: z.string().min(1).optional(),
  teacherId: z.string().min(1).optional(),
  startsAt: date.optional(),
  endsAt: date.optional(),
  capacity: z.number().int().min(1).max(100).optional(),
  status: z.nativeEnum(ScheduleStatus).optional(),
}).refine((input) => !input.startsAt || !input.endsAt || input.endsAt > input.startsAt, {
  path: ["endsAt"],
  message: "La hora de finalización debe ser posterior al inicio",
});
