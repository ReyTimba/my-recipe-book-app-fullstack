import type { Recipe } from "../domain/recipe";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error ?? "Error de conexión", res.status, body.details);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as T;
}

export async function fetchRecipes(): Promise<Recipe[]> {
  return request<Recipe[]>("/recipes");
}

export async function fetchRecipe(id: string): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`);
}

export async function createRecipe(data: Recipe): Promise<Recipe> {
  return request<Recipe>("/recipes", { method: "POST", body: JSON.stringify(data) });
}

export async function updateRecipe(id: string, data: Recipe): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function deleteRecipe(id: string): Promise<void> {
  return request<void>(`/recipes/${id}`, { method: "DELETE" });
}

export async function healthCheck(): Promise<boolean> {
  try {
    await request("/health");
    return true;
  } catch {
    return false;
  }
}
