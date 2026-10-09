import type { Response } from "express";

export function sendData<T>(res: Response, data: T, status = 200): void {
  res.status(status).json({ success: true, data });
}

export function sendList<T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number,
): void {
  res.json({
    success: true,
    data,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
