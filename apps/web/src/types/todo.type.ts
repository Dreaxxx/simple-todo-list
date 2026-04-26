import { User } from "./user.type"

export type Todo = {
    id: string,
    task: string,
    realisedAt: string,
    user: User
}