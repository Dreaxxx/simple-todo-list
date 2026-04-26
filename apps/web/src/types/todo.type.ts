export type Todo = {
    id: number;
    title: string;
    description: string | null;
    realisedAT: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        name: string | null;
        email: string;
    } | null;
};

export type CreateTodoInput = {
    title: string;
    description?: string | null;
    realisedAT?: string;
    userId?: number | null;
};

export type UpdateTodoInput = Partial<CreateTodoInput>;

export type TodoPayload = {
    title?: unknown;
    description?: unknown;
    realisedAT?: unknown;
    userId?: unknown;
};
