import "dotenv/config";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const inputSchema = z.object({
  ADMIN_NAME: z.string().trim().min(2).max(120),
  ADMIN_EMAIL: z.email().max(254),
  ADMIN_PASSWORD: z.string().min(12).max(128),
});
const input = inputSchema.safeParse(process.env);

if (!input.success) {
  console.error("Define ADMIN_NAME, ADMIN_EMAIL y ADMIN_PASSWORD (mínimo 12 caracteres) en server/.env.");
  process.exitCode = 1;
} else {
  const prisma = new PrismaClient();
  try {
    const email = input.data.ADMIN_EMAIL.toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (exists) {
      throw new Error("Ya existe una cuenta con ese correo");
    }
    await prisma.user.create({
      data: {
        name: input.data.ADMIN_NAME,
        email,
        passwordHash: await bcrypt.hash(input.data.ADMIN_PASSWORD, 12),
        role: UserRole.ADMIN,
      },
    });
    console.info(`Administrador creado: ${email}`);
  } catch (error) {
    console.error("No se pudo crear el administrador:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
    delete process.env.ADMIN_PASSWORD;
  }
}
