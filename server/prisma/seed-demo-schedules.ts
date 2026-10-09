import "dotenv/config";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { ScheduleStatus, UserRole } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const teacherUserId = "demo-teacher-user";
const teacherProfileId = "demo-teacher-profile";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Mexico_City",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const offsetFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Mexico_City",
  timeZoneName: "longOffset",
});

function nextSession(weekday: number, hour: number): Date {
  const parts = formatter.formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  const today = new Date(Date.UTC(year, month - 1, day));
  let daysAhead = (weekday - today.getUTCDay() + 7) % 7;
  if (daysAhead === 0) daysAhead = 7;

  const sessionDay = new Date(today.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  const offset = offsetFormatter
    .formatToParts(sessionDay)
    .find((part) => part.type === "timeZoneName")?.value;
  const match = offset?.match(/GMT([+-])(\d{2}):(\d{2})/);
  const sign = match?.[1] === "-" ? -1 : 1;
  const offsetMinutes = match ? sign * (Number(match[2]) * 60 + Number(match[3])) : 0;
  return new Date(Date.UTC(
    sessionDay.getUTCFullYear(),
    sessionDay.getUTCMonth(),
    sessionDay.getUTCDate(),
    hour,
  ) - offsetMinutes * 60 * 1000);
}

async function main(): Promise<void> {
  const subjects = await Promise.all([
    prisma.subject.findUniqueOrThrow({ where: { slug: "matematicas" } }),
    prisma.subject.findUniqueOrThrow({ where: { slug: "ingles" } }),
    prisma.subject.findUniqueOrThrow({ where: { slug: "fisica" } }),
  ]);

  await prisma.user.upsert({
    where: { id: teacherUserId },
    update: { name: "Profesor de prueba", role: UserRole.TEACHER, isActive: true },
    create: {
      id: teacherUserId,
      name: "Profesor de prueba",
      email: "profesor.prueba@academia-impulso.test",
      passwordHash: await bcrypt.hash(randomBytes(32).toString("hex"), 12),
      role: UserRole.TEACHER,
      isActive: true,
    },
  });

  await prisma.teacherProfile.upsert({
    where: { id: teacherProfileId },
    update: { biography: "Perfil ficticio usado para probar los horarios.", isActive: true },
    create: {
      id: teacherProfileId,
      userId: teacherUserId,
      biography: "Perfil ficticio usado para probar los horarios.",
      isActive: true,
    },
  });

  for (const subject of subjects) {
    await prisma.teacherSpecialty.upsert({
      where: { teacherId_subjectId: { teacherId: teacherProfileId, subjectId: subject.id } },
      update: {},
      create: { teacherId: teacherProfileId, subjectId: subject.id },
    });
  }

  const sessions = [
    { id: "demo-schedule-matematicas", subject: subjects[0], weekday: 1, hour: 16 },
    { id: "demo-schedule-ingles", subject: subjects[1], weekday: 2, hour: 17 },
    { id: "demo-schedule-fisica", subject: subjects[2], weekday: 6, hour: 10 },
  ];

  for (const session of sessions) {
    const startsAt = nextSession(session.weekday, session.hour);
    const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);
    await prisma.schedule.upsert({
      where: { id: session.id },
      update: {
        subjectId: session.subject.id,
        teacherId: teacherProfileId,
        startsAt,
        endsAt,
        capacity: 5,
        status: ScheduleStatus.ACTIVE,
      },
      create: {
        id: session.id,
        subjectId: session.subject.id,
        teacherId: teacherProfileId,
        startsAt,
        endsAt,
        capacity: 5,
        status: ScheduleStatus.ACTIVE,
      },
    });
  }

  console.info("Horarios de demostración creados/actualizados para Matemáticas, Inglés y Física.");
}

main()
  .catch((error: unknown) => {
    console.error("No se pudieron cargar los horarios de demostración:", error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
