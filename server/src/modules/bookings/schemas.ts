import { BookingStatus } from "@prisma/client";
import { z } from "zod";

export const bookingCreateSchema = z.object({ scheduleId: z.string().min(1) });
export const bookingStatusSchema = z.object({ status: z.nativeEnum(BookingStatus) });
