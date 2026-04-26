export type CreateTodoInput = {
    title: string;
    description?: string | null;
    realisedAT: Date;
    userId?: number | null;
};

export type UpdateTodoInput = {
    title?: string;
    description?: string | null;
    realisedAT?: Date;
    userId?: number | null;
};

export type TodoPayload = {
    title: string;
    description?: string | null;
    realisedAT: string;
    userId?: number | null;
};
