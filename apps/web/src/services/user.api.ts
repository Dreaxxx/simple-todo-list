import { User } from "../types/user.type";
import { fetchJson } from "../utils/api/api-client";


export async function getAll(): Promise<User[]> {
    return fetchJson<User[]>("/user");
}
