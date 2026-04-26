export type Todo = {
    id: number;
    title: string;
    description: string | null;
    realisedAT: string | null;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        name: string | null;
        email: string;
    } | null;
};

export type CreateTodoInput = Omit<Todo, "id" | "createdAt" | "updatedAt" | "user">;

export type UpdateTodoInput = Partial<CreateTodoInput>;

export type TodoPayload = {
    title?: unknown;
    description?: unknown;
    realisedAT?: unknown;
    userId?: unknown;
};