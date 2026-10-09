import { z } from "zod";

export const subjectCreateSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().max(1000).optional(),
});
export const subjectUpdateSchema = subjectCreateSchema.partial().extend({
  isActive: z.boolean().optional(),
});
