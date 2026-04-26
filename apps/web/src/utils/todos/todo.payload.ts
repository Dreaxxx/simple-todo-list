import type { CreateTodoInput, UpdateTodoInput } from "../../types/todo.type";

export function buildCreateTodoInput(input: {
  title: string;
  description: string;
  realisedAt: string;
}): CreateTodoInput {
  return {
    title: input.title.trim(),
    description: input.description.trim() || null,
    realisedAT: input.realisedAt ? new Date(input.realisedAt).toISOString() : undefined,
  };
}

export function buildUpdateTodoInput(input: {
  title: string;
  description: string;
  realisedAt: string;
  userId: string;
}): UpdateTodoInput {
  return {
    title: input.title.trim(),
    description: input.description.trim() || null,
    realisedAT: input.realisedAt ? new Date(input.realisedAt).toISOString() : undefined,
    userId: input.userId === "none" ? null : Number(input.userId),
  };
}
