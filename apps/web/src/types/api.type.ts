import type { Todo } from "./todo.type";
import type { User } from "./user.type";

export type ApiResponse<T> = {
    status: string;
    data: T;
    message?: string;
};

export type TodoApiResponse = ApiResponse<Todo[]>;
export type TodoItemApiResponse = ApiResponse<Todo>;
export type UserApiResponse = ApiResponse<User[]>;
