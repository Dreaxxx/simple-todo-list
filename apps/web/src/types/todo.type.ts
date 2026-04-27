import { TodoUser } from "./user.type";

export type Todo = {
    id: number;
    title: string;
    description: string | null;
    realisedAT: string | null;
    createdAt: string;
    updatedAt: string;
    user: TodoUser
};

export type CreateTodoInput = {
    title: string;
    description?: string | null;
    realisedAT?: string;
    userId?: number | null;
};

export type UpdateTodoInput = Partial<CreateTodoInput>;
