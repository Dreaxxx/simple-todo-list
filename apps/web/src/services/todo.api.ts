import { Todo } from "../types/todo.type";


export async function getAll(): Promise<Todo[]> {
    const response = await fetch("http://localhost:3000/api/todo");

    console.log("Ici", response)

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}

export async function create(todo: Todo): Promise<Todo> {
    const response = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}