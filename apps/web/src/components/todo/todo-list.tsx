import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import { useState } from "react";
import { Alert, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import type { Todo, UpdateTodoInput } from "../../types/todo.type";
import { TodoCard } from "./todo-card";
import { TodoEditDialog } from "./todo-edit-dialog";

type TodoListProps = {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
  isCreateError: boolean;
  isUpdatePending: boolean;
  onUpdateTodo: (id: number, payload: UpdateTodoInput) => Promise<void>;
};

export function TodoList({
  todos,
  isLoading,
  isError,
  isCreateError,
  isUpdatePending,
  onUpdateTodo,
}: TodoListProps) {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Typography variant="h5">Liste des taches</Typography>
        <LinearProgress />
      </Stack>
    );
  }

  if (isError) {
    return <Alert severity="error">Erreur de chargement de la liste des todos.</Alert>;
  }

  return (
    <Stack spacing={2.5}>
      <Stack
        alignItems={{ xs: "flex-start", sm: "center" }}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={1}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <ViewListRoundedIcon color="primary" />
          <Typography variant="h5">Liste des taches</Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          {todos.length} resultat{todos.length > 1 ? "s" : ""}
        </Typography>
      </Stack>

      {isCreateError && (
        <Alert severity="error">Erreur lors de la creation du todo.</Alert>
      )}

      {todos.length === 0 ? (
        <Alert severity="info">
          Aucune tache ne correspond a la recherche actuelle.
        </Alert>
      ) : (
        <>
          <Grid container spacing={2.5}>
            {todos.map((todo) => (
              <Grid key={todo.id} size={{ xs: 12, md: 6 }}>
                <TodoCard
                  todo={todo}
                  onEdit={() => setSelectedTodo(todo)}
                />
              </Grid>
            ))}
          </Grid>

          <TodoEditDialog
            isSubmitting={isUpdatePending}
            open={selectedTodo !== null}
            todo={selectedTodo}
            onClose={() => setSelectedTodo(null)}
            onSubmit={async (id, payload) => {
              await onUpdateTodo(id, payload);
              setSelectedTodo(null);
            }}
          />
        </>
      )}
    </Stack>
  );
}
