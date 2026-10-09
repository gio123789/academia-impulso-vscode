const apiBaseUrl = (import.meta.env.VITE_API_URL ?? "http://localhost:3001/api").replace(/\/$/, "");

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: { message?: string };
};

export async function postContactRequest(input: {
  name: string;
  subjectSlug: string;
  message: string;
}): Promise<void> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error("No se pudo enviar la solicitud. Verifica tu conexión e inténtalo de nuevo.");
  }

  const result = (await response.json().catch(() => null)) as ApiEnvelope<unknown> | null;
  if (!response.ok || !result?.success) {
    throw new Error("No se pudo enviar la solicitud. Inténtalo de nuevo más tarde.");
  }
}
