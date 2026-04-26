import { SyntheticEvent, useMemo, useState } from "react";
import TodoCard from "../components/todo-card";
import TodoForm from "../components/todo-form.add";
import { Todo } from "../types/todo.type";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/todo.api";
import { Divider } from "../components/divider";

export default function TodoPage() {

    const [todo, setTodo] = useState<Todo[]>([])
    const [todoName, setTodoName] = useState<string>("")
    const [todoRealisedAt, setTodoRealisedAt] = useState<string>("")
    const [search, setSearch] = useState<string>("")

    const query = useQuery({
        queryKey: ['todos'],
        queryFn: getAll,
    })

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        console.log("TodoName : ", todoName)
        console.log("todoRealisedAt : ", todoRealisedAt)
    }

    const todoList = useMemo(() => {
        return query.data!.filter((t) => t.task.includes(search));
    }, [todo, search]);

    return (
        <div>
            <h3>Todo Page</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="task" onChange={(e) => setTodoName(e.target.value)} placeholder="Task Name" />
                <input type="date" name="realisaedAt" placeholder="Realised At ?" onChange={(e) => setTodoRealisedAt(e.target.value)} />
                <input type="submit" />
            </form>
            <Divider />
            <section>
                {query.isLoading ?
                    (
                        <div>Chargement de la TodoList ...</div>
                    ) :
                    query.isError ?
                        (
                            <div>Erreur de chargement de la liste des Todos</div>
                        ) :
                        query.isSuccess &&
                        (
                            <ul>
                                {todoList.map(t => (
                                    <>
                                        <li>Tache : {t.task}</li>
                                        <li>Personne : {t.user.name}</li>
                                        <li>Date : {t.realisedAt}</li>
                                    </>
                                ))}
                            </ul>
                        )

                }
            </section>
        </div>
    )
}