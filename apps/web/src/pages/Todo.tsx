import type { SyntheticEvent } from "react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack } from "@mui/material";
import { TodoCreateForm } from "../components/todo/todo-create-form";
import { TodoHeader } from "../components/todo/todo-header";
import { TodoList } from "../components/todo/todo-list";
import { TodoSearchBar } from "../components/todo/todo-search-bar";
import { create, getAll, remove, update } from "../services/todo.api";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo.type";
import { useDebounce } from "../hooks/useDebounce";
import { filterTodos } from "../utils/todos/todo.filter";
import { buildCreateTodoInput } from "../utils/todos/todo.payload";

type UpdateTodoVariables = {
    id: number;
    payload: UpdateTodoInput;
};

export default function TodoPage() {
    const [title, setTitle] = useState("");
    const [realisedAt, setRealisedAt] = useState("");
    const [description, setDescription] = useState("");

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 300);

    const queryClient = useQueryClient();

    const todosQuery = useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: getAll,
        refetchOnWindowFocus: false,
    });

    const createTodoMutation = useMutation<Todo, Error, CreateTodoInput>({
        mutationFn: create,

        onSuccess: async () => {
            setTitle("");
            setRealisedAt("");
            setDescription("");
            await queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const updateTodoMutation = useMutation<Todo, Error, UpdateTodoVariables>({
        mutationFn: ({ id, payload }) =>
            update(id, payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const deleteTodoMutation = useMutation<void, Error, number>({
        mutationFn: remove,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (title.trim() === "") {
            return;
        }

        await createTodoMutation.mutateAsync({
            ...buildCreateTodoInput({
                title,
                description,
                realisedAt,
            }),
        });
    }

    const todoList = useMemo(() => {
        return filterTodos(todosQuery.data ?? [], debouncedSearch);
    }, [debouncedSearch, todosQuery.data]);

    async function handleUpdateTodo(id: number, payload: UpdateTodoInput) {
        await updateTodoMutation.mutateAsync({ id, payload });
    }

    async function handleDeleteTodo(id: number) {
        await deleteTodoMutation.mutateAsync(id);
    }

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
                createError={createTodoMutation.error}
                isUpdatePending={updateTodoMutation.isPending}
                updateError={updateTodoMutation.error}
                deleteError={deleteTodoMutation.error}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo}
            />
        </Stack>
    );
}
