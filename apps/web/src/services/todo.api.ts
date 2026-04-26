import { fetchJson } from "../utils/api/api-client";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo.type";

export async function getAll(): Promise<Todo[]> {
    return fetchJson<Todo[]>("/todo");
}

export async function create(todo: CreateTodoInput): Promise<Todo> {
    return fetchJson<Todo>("/todo", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });
}

export async function update(id: number, todo: UpdateTodoInput): Promise<Todo> {
    return fetchJson<Todo>(`/todo/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });
}

export async function remove(id: number): Promise<void> {
    await fetchJson<Todo>(`/todo/${id}`, {
        method: "DELETE"
    });
}
