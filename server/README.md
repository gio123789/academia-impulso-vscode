# Backend de Academia Impulso

API Node.js + TypeScript + Express 5, PostgreSQL y Prisma. El backend vive en esta carpeta y no reemplaza la aplicación React/Vite del directorio raíz.

## Requisitos

- Node.js 20 o posterior.
- pnpm 9 o posterior (si Corepack está instalado, `corepack pnpm` lo ejecuta).
- PostgreSQL 14 o posterior instalado y ejecutándose localmente.

## Instalación y ejecución local

Desde la raíz del proyecto:

```powershell
Copy-Item server\.env.example server\.env
Copy-Item .env.example .env
corepack pnpm --dir server install
corepack pnpm --dir server prisma:generate
corepack pnpm --dir server prisma:migrate
corepack pnpm --dir server prisma:seed
corepack pnpm --dir server dev
```

La API se inicia en `http://localhost:3001`. Para esta versión se exponen únicamente tres endpoints:

- `GET /api/subjects`: materias activas; acepta paginación `page` y `limit`.
- `GET /api/schedules`: horarios activos; acepta `page`, `limit`, `subjectId` y `teacherId`.
- `POST /api/contact`: registra una solicitud; acepta `name`, `message` y opcionalmente `email`, `phone`, `subjectId` o `subjectSlug`.

Las respuestas usan el formato JSON `{ success, data, meta? }`; errores responden `{ success: false, error }`. Cualquier otra ruta o método responde 404. El frontend usa `VITE_API_URL=http://localhost:3001/api`.

## Horarios de demostración

Para agregar o actualizar tres horarios ficticios próximos (uno por materia), ejecuta `corepack pnpm --dir server demo:schedules`. Se usa un profesor ficticio, horarios de 60 minutos en la zona `America/Mexico_City` y el script es idempotente. Esta información es solo para pruebas/demostración; sustitúyela por horarios reales antes de ofrecerlos a estudiantes.

Antes de ejecutar migraciones, crea en PostgreSQL una base `impulso` y configura en `server/.env` un usuario y contraseña válidos para tu instalación. Mantén PostgreSQL ejecutándose al usar la API.

`DATABASE_URL` y `JWT_SECRET` son configuración local de ejemplo, no credenciales de producción. Antes de publicar, configura un secreto aleatorio de al menos 32 caracteres, credenciales de base de datos seguras y los orígenes CORS permitidos.

## Scripts

```powershell
corepack pnpm --dir server dev
corepack pnpm --dir server build
corepack pnpm --dir server typecheck
corepack pnpm --dir server test
corepack pnpm --dir server prisma:migrate
corepack pnpm --dir server prisma:seed
```

La base de datos conserva el modelo relacional completo para permitir ampliar el sistema más adelante, pero los endpoints de autenticación, profesores, reservas, planes, pagos y administración no están expuestos en esta versión.

Las migraciones se guardan en `prisma/migrations`. `prisma:migrate` aplica o crea migraciones en desarrollo; en entornos desplegados ejecuta `prisma:deploy`.

## Pruebas

Vitest/Supertest cubren el alcance de los tres endpoints y la validación de contacto. Las pruebas usan Prisma simulado, por lo que no modifican la base de datos.
