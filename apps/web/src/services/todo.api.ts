import { TodoApiResponse, TodoItemApiResponse } from "../types/api.type";
import type { CreateTodoInput, Todo } from "../types/todo.type";

export async function getAll(): Promise<Todo[]> {
    const response = await fetch("http://localhost:3000/api/todo");

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const result: TodoApiResponse = await response.json();
    return result.data;
}

export async function create(todo: CreateTodoInput): Promise<Todo> {
    const response = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const result: TodoItemApiResponse = await response.json();
    return result.data;
}

export async function update(id: number, todo: Partial<CreateTodoInput>): Promise<Todo> {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const result: TodoItemApiResponse = await response.json();
    return result.data;
}

export async function remove(id: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
}
