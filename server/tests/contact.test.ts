import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  contactCreate: vi.fn(),
  subjectFindUnique: vi.fn(),
}));

vi.mock("../src/config/database.js", () => ({
  prisma: {
    contactRequest: { create: mocks.contactCreate },
    subject: { findUnique: mocks.subjectFindUnique },
  },
}));

import request from "supertest";
import { app } from "../src/app.js";

describe("solicitudes de contacto", () => {
  beforeEach(() => vi.clearAllMocks());

  it("guarda una solicitud con los datos validados", async () => {
    mocks.subjectFindUnique.mockResolvedValue({ id: "subject-1", isActive: true });
    mocks.contactCreate.mockResolvedValue({
      id: "contact-1",
      name: "Madre de prueba",
      email: null,
      phone: null,
      message: "Busco información para secundaria",
      subject: { id: "subject-1", name: "Matemáticas" },
      status: "NEW",
      createdAt: new Date(),
    });

    const response = await request(app).post("/api/contact").send({
      name: "Madre de prueba",
      subjectSlug: "matematicas",
      message: "Busco información para secundaria",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.status).toBe("NEW");
    expect(mocks.contactCreate).toHaveBeenCalledOnce();
  });

  it("rechaza solicitudes inválidas sin almacenarlas", async () => {
    const response = await request(app).post("/api/contact").send({ name: "", message: "x" });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(mocks.contactCreate).not.toHaveBeenCalled();
  });

  it("responde 400 para JSON malformado", async () => {
    const response = await request(app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send("{name:");
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_JSON");
  });
});
