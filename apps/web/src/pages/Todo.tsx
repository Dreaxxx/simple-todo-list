import type { SyntheticEvent } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, getAll } from "../services/todo.api";
import { Divider } from "../components/divider";
import { useDebounce } from "../hooks/useDebounced";

export default function TodoPage() {
    const [title, setTitle] = useState("");
    const [realisedAt, setRealisedAt] = useState("");
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 300);

    const queryClient = useQueryClient();

    const todosQuery = useQuery({
        queryKey: ["todos"],
        queryFn: getAll,
    });

    const createTodoMutation = useMutation({
        mutationFn: create,
        onSuccess: async () => {
            setTitle("");
            setRealisedAt("");
            await queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (title.trim() === "") {
            return;
        }

        await createTodoMutation.mutateAsync({
            title: title.trim(),
            realisedAT: realisedAt ? new Date(realisedAt).toISOString() : null,
            description: "",
        });
    }

    const todoList = useMemo(() => {
        const todos = todosQuery.data ?? [];
        const normalizedSearch = debouncedSearch.trim().toLowerCase();

        if (normalizedSearch === "") {
            return todos;
        }

        return todos.filter((todo) => {
            const matchesTitle = todo.title.toLowerCase().includes(normalizedSearch);
            const matchesUser = todo.user?.name
                ?.toLowerCase()
                .includes(normalizedSearch);

            return matchesTitle || matchesUser;
        });
    }, [debouncedSearch, todosQuery.data]);

    return (
        <div>
            <h3>Todo Page</h3>

            <input
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
            />

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="task"
                    value={title}
                    placeholder="Task Name"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="date"
                    name="realisedAt"
                    value={realisedAt}
                    placeholder="Realised At ?"
                    onChange={(e) => setRealisedAt(e.target.value)}
                />
                <input
                    type="submit"
                    value={createTodoMutation.isPending ? "Creation..." : "Ajouter"}
                    disabled={createTodoMutation.isPending}
                />
            </form>

            <Divider />

            <section>
                {todosQuery.isLoading && <div>Chargement de la todo list...</div>}

                {todosQuery.isError && (
                    <div>Erreur de chargement de la liste des todos.</div>
                )}

                {createTodoMutation.isError && (
                    <div>Erreur lors de la creation du todo.</div>
                )}

                {todosQuery.isSuccess && (
                    <ul>
                        {todoList.map((todo) => (
                            <li key={todo.id}>
                                <span>Tache : {todo.title}</span>
                                <Divider />
                                <span>Personne : {todo.user?.name ?? "Pas encore affecte"}</span>
                                <Divider />
                                <span>Date : {todo.realisedAT ?? "Non renseignee"}</span>
                                <Divider />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}