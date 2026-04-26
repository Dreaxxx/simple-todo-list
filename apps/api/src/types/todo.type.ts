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

export type CreateTodoInput = {
    title: string;
    description?: string | null;
    realisedAT?: Date | null;
    userId?: number | null;
};

export type UpdateTodoInput = {
    title?: string;
    description?: string | null;
    realisedAT?: Date | null;
    userId?: number | null;
};

export type TodoPayload = {
    title?: unknown;
    description?: unknown;
    realisedAT?: unknown;
    userId?: unknown;
};
