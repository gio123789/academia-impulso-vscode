import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { env } from "../../config/env.js";
import { prisma } from "../../config/database.js";
import { conflict, unauthorized } from "../../shared/errors.js";
import type { z } from "zod";
import type { loginSchema, registerSchema } from "./schemas.js";

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;
const publicUser = { id: true, name: true, email: true, phone: true, role: true, isActive: true, createdAt: true } as const;

function issueToken(user: { id: string; role: UserRole }): string {
  return jwt.sign({ role: user.role }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export async function register(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (existing) throw conflict("Ya existe una cuenta con ese correo");
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      phone: input.phone,
      passwordHash,
      role: input.role,
      ...(input.role === UserRole.STUDENT && input.educationLevel
        ? { studentProfile: { create: { educationLevel: input.educationLevel } } }
        : {}),
    },
    select: publicUser,
  });
  return { user, accessToken: issueToken(user) };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (!user || !user.isActive || !(await bcrypt.compare(input.password, user.passwordHash))) {
    throw unauthorized("Correo o contraseña incorrectos");
  }
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return { user: safeUser, accessToken: issueToken(user) };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: publicUser });
  if (!user) throw unauthorized();
  return user;
}
