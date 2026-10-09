import { z } from "zod";

export const teacherCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(30).optional(),
  password: z.string().min(10).max(128),
  biography: z.string().trim().max(2000).optional(),
  subjectIds: z.array(z.string().min(1)).min(1),
});
export const teacherUpdateSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().max(30).nullable().optional(),
  biography: z.string().trim().max(2000).nullable().optional(),
  isActive: z.boolean().optional(),
  subjectIds: z.array(z.string().min(1)).optional(),
});
