import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  subjectFindMany: vi.fn(),
  subjectCount: vi.fn(),
  scheduleFindMany: vi.fn(),
  scheduleCount: vi.fn(),
}));

vi.mock("../src/config/database.js", () => ({
  prisma: {
    subject: { findMany: mocks.subjectFindMany, count: mocks.subjectCount },
    schedule: { findMany: mocks.scheduleFindMany, count: mocks.scheduleCount },
  },
}));

import request from "supertest";
import { app } from "../src/app.js";

describe("alcance público de la API", () => {
  beforeEach(() => vi.clearAllMocks());

  it("expone el listado paginado de materias", async () => {
    mocks.subjectFindMany.mockResolvedValue([{ id: "subject-1", name: "Matemáticas" }]);
    mocks.subjectCount.mockResolvedValue(1);

    const response = await request(app).get("/api/subjects");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta.total).toBe(1);
  });

  it("expone el listado paginado de horarios", async () => {
    mocks.scheduleFindMany.mockResolvedValue([]);
    mocks.scheduleCount.mockResolvedValue(0);

    const response = await request(app).get("/api/schedules");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  it.each([
    ["GET", "/api/health"],
    ["GET", "/api/docs"],
    ["GET", "/api/openapi.json"],
    ["POST", "/api/auth/login"],
    ["POST", "/api/bookings"],
    ["POST", "/api/subjects"],
    ["POST", "/api/schedules"],
    ["GET", "/api/contact"],
  ] as const)("no expone %s %s", async (method, path) => {
    const response = method === "GET"
      ? await request(app).get(path)
      : await request(app).post(path);
    expect(response.status).toBe(404);
  });
});
