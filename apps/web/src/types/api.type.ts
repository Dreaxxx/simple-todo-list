import type { Todo } from "./todo.type";
import type { User } from "./user.type";

export type TodoApiResponse = {
    status: string;
    data: Todo[];
};

export type TodoItemApiResponse = {
    status: string;
    data: Todo;
};

export type UserApiResponse = {
    status: string;
    data: User[]
};
