import { UserApiResponse } from "../types/api.type";
import { User } from "../types/user.type";

export async function getAll(): Promise<User[]> {
    const response = await fetch("http://localhost:3000/api/user");

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const result: UserApiResponse = await response.json();
    return result.data;
}