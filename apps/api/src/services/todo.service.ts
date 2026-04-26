import todoRepository from "../repositories/todo.repository";
import { asNonEmptyString, asOptionalString, asOptionalDate, asOptionalPositiveInt } from "../routes/helpers/inputs.validation";
import { ValidationError, NotFoundError } from "../routes/helpers/route.errors";
import { TodoPayload, CreateTodoInput, UpdateTodoInput } from "../types/todo.type";

function buildCreateInput(payload: TodoPayload): CreateTodoInput {
  return {
    title: asNonEmptyString(payload.title, "title"),
    description: asOptionalString(payload.description),
    realisedAT: asOptionalDate(payload.realisedAT),
    userId: asOptionalPositiveInt(payload.userId, "userId"),
  };
}

function buildUpdateInput(payload: TodoPayload): UpdateTodoInput {
  const data: UpdateTodoInput = {};

  if (payload.title !== undefined) {
    data.title = asNonEmptyString(payload.title, "title");
  }

  if (payload.description !== undefined) {
    data.description = asOptionalString(payload.description);
  }

  if (payload.realisedAT !== undefined) {
    data.realisedAT = asOptionalDate(payload.realisedAT);
  }

  if (payload.userId !== undefined) {
    data.userId = asOptionalPositiveInt(payload.userId, "userId");
  }

  if (Object.keys(data).length === 0) {
    throw new ValidationError("At least one field must be provided for update.");
  }

  return data;
}

async function readAll() {
  return todoRepository.readAll();
}

async function readOne(id: number) {
  const todo = await todoRepository.readOne(id);

  if (!todo) {
    throw new NotFoundError("Todo not found.");
  }

  return todo;
}

async function create(payload: TodoPayload) {
  return todoRepository.create(buildCreateInput(payload));
}

async function update(id: number, payload: TodoPayload) {
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
