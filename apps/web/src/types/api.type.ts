import { Todo } from "./todo.type";

export type TodoApiResponse = {
    status: string;
    data: Todo[];
};

export type TodoItemApiResponse = {
    status: string;
    data: Todo;
};