export type User = {
    id: number;
    name: string | null;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type TodoUser = Omit<User, "createdAt" | "updatedAt">;