import type { Todo } from "../types/todo.type";

type TodoApiResponse = {
    status: string;
    data: Todo[];
};

type TodoItemApiResponse = {
    status: string;
    data: Todo;
};

type CreateTodoInput = {
    title: string;
    realisedAT?: string | null;
    userId?: number | null;
};

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
