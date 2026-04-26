import { prisma } from "../lib/prisma";
import type { CreateTodoInput, UpdateTodoInput } from "../types/todo.type";

const todoInclude = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} as const;

async function create(data: CreateTodoInput) {
  return prisma.todo.create({
    data,
    include: todoInclude,
  });
}

async function readAll() {
  return prisma.todo.findMany({
    include: todoInclude,
    orderBy: { createdAt: "desc" },
  });
}

async function readOne(id: number) {
  return prisma.todo.findUnique({
    where: { id },
    include: todoInclude,
  });
}

async function update(id: number, data: UpdateTodoInput) {
  return prisma.todo.update({
    where: { id },
    data,
    include: todoInclude,
  });
}

async function remove(id: number) {
  return prisma.todo.delete({
    where: { id },
    include: todoInclude,
  });
}

export default {
  create,
  readAll,
  readOne,
  update,
  remove,
};
