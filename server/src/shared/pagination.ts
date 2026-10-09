import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const activeFilterSchema = z.object({
  active: z.enum(["true", "false", "all"]).default("true"),
});

export function pageArgs(page: number, limit: number) {
  return { skip: (page - 1) * limit, take: limit };
}
