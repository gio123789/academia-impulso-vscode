import { EducationLevel, UserRole } from "@prisma/client";
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(30).optional(),
  password: z.string().min(10).max(128),
  role: z.enum([UserRole.STUDENT, UserRole.GUARDIAN]).default(UserRole.STUDENT),
  educationLevel: z.enum([EducationLevel.SECONDARY, EducationLevel.HIGH_SCHOOL]).optional(),
}).superRefine((input, ctx) => {
  if (input.role === UserRole.STUDENT && !input.educationLevel) {
    ctx.addIssue({ code: "custom", path: ["educationLevel"], message: "El nivel educativo es obligatorio para estudiantes" });
  }
});

export const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(128),
});
