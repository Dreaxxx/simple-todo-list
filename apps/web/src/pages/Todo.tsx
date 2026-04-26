import type { SyntheticEvent } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack } from "@mui/material";
import { TodoCreateForm } from "../components/todo/todo-create-form";
import { TodoHeader } from "../components/todo/todo-header";
import { TodoList } from "../components/todo/todo-list";
import { TodoSearchBar } from "../components/todo/todo-search-bar";
import { create, getAll } from "../services/todo.api";
import { useDebounce } from "../hooks/useDebounced";

export default function TodoPage() {
    const [title, setTitle] = useState("");
    const [realisedAt, setRealisedAt] = useState("");
    const [description, setDescription] = useState("");

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
            setDescription("");
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
            realisedAT: realisedAt ? new Date(realisedAt).toISOString() : new Date().toISOString(),
            description: description.trim() || null,
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
        <Stack spacing={3.5}>
            <TodoHeader totalCount={todosQuery.data?.length ?? 0} />

            <TodoSearchBar search={search} onSearchChange={setSearch} />

            <TodoCreateForm
                description={description}
                isSubmitting={createTodoMutation.isPending}
                realisedAt={realisedAt}
                title={title}
                onDescriptionChange={setDescription}
                onRealisedAtChange={setRealisedAt}
                onSubmit={handleSubmit}
                onTitleChange={setTitle}
            />

            <TodoList
                todos={todoList}
                isLoading={todosQuery.isLoading}
                isError={todosQuery.isError}
                isCreateError={createTodoMutation.isError}
            />
        </Stack>
    );
}
