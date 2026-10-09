import "./config/env.js";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

const server = app.listen(env.PORT, () => {
  console.info(`API de Academia Impulso disponible en http://localhost:${env.PORT}`);
});

async function shutdown(signal: string): Promise<void> {
  console.info(`Recibida señal ${signal}; cerrando el servidor`);
  server.close(async (error) => {
    if (error) {
      console.error("Error al cerrar el servidor HTTP:", error);
      process.exitCode = 1;
    }
    await prisma.$disconnect();
  });
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
