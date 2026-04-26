import { Todo } from "./todo.type";
import { User } from "./user.type";

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