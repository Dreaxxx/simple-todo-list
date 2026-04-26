export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

const API_BASE_URL = "http://localhost:3000/api";

type ApiResponse<T> = {
  status: string;
  data: T;
  message?: string;
};

async function readErrorMessage(response: Response) {
  try {
    const result = (await response.json()) as { message?: string };
    return result.message ?? "La requete n'a pas pu aboutir.";
  } catch {
    return "La requete n'a pas pu aboutir.";
  }
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  const result = (await response.json()) as ApiResponse<T>;
  return result.data;
}
