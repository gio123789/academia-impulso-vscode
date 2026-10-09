import { ContactStatus } from "@prisma/client";
import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254).optional(),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(3).max(3000),
  subjectId: z.string().min(1).optional(),
  subjectSlug: z.string().trim().min(2).max(80).optional(),
}).refine((input) => !input.subjectId || !input.subjectSlug, {
  path: ["subjectId"],
  message: "Usa subjectId o subjectSlug, no ambos",
});
export const contactStatusSchema = z.object({ status: z.nativeEnum(ContactStatus) });
