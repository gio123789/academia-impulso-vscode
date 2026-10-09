process.env.NODE_ENV = "test";
process.env.PORT ??= "3001";
process.env.DATABASE_URL ??= "postgresql://impulso:impulso_local@localhost:5432/impulso?schema=public";
process.env.JWT_SECRET ??= "test-secret-that-is-at-least-32-characters-long";
process.env.JWT_EXPIRES_IN ??= "15m";
process.env.CORS_ORIGIN ??= "http://localhost:5173";
process.env.RATE_LIMIT_WINDOW_MS ??= "900000";
process.env.RATE_LIMIT_MAX ??= "100";
