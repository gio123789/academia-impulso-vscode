import { z } from "zod";

export const planCreateSchema = z.object({
  subjectId: z.string().min(1).nullable().optional(),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(1000).optional(),
  price: z.number().finite().min(0).max(1000000),
  sessionCount: z.number().int().min(1).max(1000),
  isActive: z.boolean().optional(),
});
export const planUpdateSchema = planCreateSchema.partial();
