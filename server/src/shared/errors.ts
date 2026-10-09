export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(message, 400, "BAD_REQUEST", details);
export const unauthorized = (message = "Autenticación requerida") =>
  new AppError(message, 401, "UNAUTHORIZED");
export const forbidden = (message = "No tienes permiso para realizar esta acción") =>
  new AppError(message, 403, "FORBIDDEN");
export const notFound = (message = "No se encontró el recurso") =>
  new AppError(message, 404, "NOT_FOUND");
export const conflict = (message: string) => new AppError(message, 409, "CONFLICT");
