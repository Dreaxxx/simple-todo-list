import { ValidationError } from "../../services/todo.service";

export function parseId(rawId: string) {
  const id = Number(rawId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError("id must be a positive integer.");
  }

  return id;
}
