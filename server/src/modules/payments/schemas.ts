import { PaymentStatus } from "@prisma/client";
import { z } from "zod";

export const paymentCreateSchema = z.object({
  planId: z.string().min(1),
  externalReference: z.string().trim().min(1).max(200).optional(),
});
export const paymentStatusSchema = z.object({ status: z.nativeEnum(PaymentStatus) });
