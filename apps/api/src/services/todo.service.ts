import { Todo } from "../generated/prisma/client";
import todoRepository from "../repositories/todo.repository";
import {
  asNonEmptyString,
  asRequiredDate,
  asOptionalPositiveInt,
} from "../routes/helpers/inputs.validation";
import { ValidationError, NotFoundError } from "../routes/helpers/route.errors";
import type { TodoPayload, CreateTodoInput, UpdateTodoInput } from "../types/todo.type";

function buildCreateInput(payload: TodoPayload): CreateTodoInput {
  return {
    title: asNonEmptyString(payload.title, "title"),
    description: payload.description!.trim() || null,
    realisedAT: new Date(asRequiredDate(payload.realisedAT)),
    userId: asOptionalPositiveInt(payload.userId, "userId"),
  };
}

function buildUpdateInput(payload: TodoPayload): UpdateTodoInput {
  const data: UpdateTodoInput = {};

  if (payload.title !== undefined) {
    data.title = asNonEmptyString(payload.title, "title");
  }

  if (payload.description !== undefined) {
    data.description = payload.description!.trim() || null;
  }

  if (payload.realisedAT !== undefined) {
    data.realisedAT = new Date(asRequiredDate(payload.realisedAT));
  }

  if (payload.userId !== undefined) {
    data.userId = asOptionalPositiveInt(payload.userId, "userId");
  }

  if (Object.keys(data).length === 0) {
    throw new ValidationError("At least one field must be provided for update.");
  }

  return data;
}

async function readAll(): Promise<Todo[]> {
  return todoRepository.readAll();
}

async function readOne(id: number): Promise<Todo> {
  const todo = await todoRepository.readOne(id);

  if (!todo) {
    throw new NotFoundError("Todo not found.");
  }

  return todo;
}

async function create(payload: TodoPayload): Promise<Todo> {
  return todoRepository.create(buildCreateInput(payload));
}

async function update(id: number, payload: TodoPayload): Promise<Todo> {
  await readOne(id);
  return todoRepository.update(id, buildUpdateInput(payload));
}

async function remove(id: number) {
  await readOne(id);
  return todoRepository.remove(id);
}

export { NotFoundError, ValidationError };

export default {
  readAll,
  readOne,
  create,
  update,
  remove,
};
