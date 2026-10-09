import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subjects = [
  {
    name: "Matemáticas",
    slug: "matematicas",
    description: "Álgebra, ecuaciones y geometría.",
  },
  {
    name: "Inglés",
    slug: "ingles",
    description: "Gramática, lectura y conversación.",
  },
  {
    name: "Física",
    slug: "fisica",
    description: "Movimiento, fuerzas y energía.",
  },
];

async function main(): Promise<void> {
  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: { name: subject.name, description: subject.description, isActive: true },
      create: subject,
    });
  }
}

main()
  .catch((error: unknown) => {
    console.error("No se pudieron cargar las materias iniciales:", error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
