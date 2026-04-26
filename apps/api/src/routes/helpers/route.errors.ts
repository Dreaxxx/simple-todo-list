import type { Context } from "hono";

export class NotFoundError extends Error { }
export class ValidationError extends Error { }

export function handleRouteError(c: Context, error: unknown) {
  if (error instanceof ValidationError) {
    return c.json({ status: "error", message: error.message }, 400);
  }

  if (error instanceof NotFoundError) {
    return c.json({ status: "error", message: error.message }, 404);
  }

  console.error(error);
  return c.json({ status: "error", message: "Internal server error." }, 500);
}
