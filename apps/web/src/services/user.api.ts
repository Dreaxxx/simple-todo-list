import type { Todo } from "../types/todo.type";
import { User, TodoUser } from "../types/user.type";

type UserApiResponse = {
    status: string;
    data: User[]
};

type UserItemApiResponse = {
    status: string;
    data: TodoUser;
};

export async function getAll(): Promise<User[]> {
    const response = await fetch("http://localhost:3000/api/user");

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const result: UserApiResponse = await response.json();
    return result.data;
}