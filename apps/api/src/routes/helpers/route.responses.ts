import type { Context } from "hono";

type SuccessStatusCode = 200 | 201;

export function jsonSuccess<T>(c: Context, data: T, status: SuccessStatusCode = 200) {
  return c.json(
    {
      status: "ok",
      data,
    },
    status,
  );
}
