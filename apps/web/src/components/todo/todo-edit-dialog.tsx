import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { getAll as getAllUsers } from "../../services/user.api";
import type { Todo, UpdateTodoInput } from "../../types/todo.type";
import { getErrorMessage } from "../../utils/errors/error-message";
import { buildUpdateTodoInput } from "../../utils/todos/todo.payload";

type TodoEditDialogProps = {
  open: boolean;
  todo: Todo | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (id: number, payload: UpdateTodoInput) => Promise<void>;
};

export function TodoEditDialog({
  open,
  todo,
  isSubmitting,
  onClose,
  onSubmit,
}: TodoEditDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [realisedAt, setRealisedAt] = useState("");
  const [userId, setUserId] = useState<string>("none");

  const usersQuery = useQuery<Awaited<ReturnType<typeof getAllUsers>>, Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: open,
  });

  useEffect(() => {
    if (!todo) {
      return;
    }

    setTitle(todo.title);
    setDescription(todo.description ?? "");
    setRealisedAt(todo.realisedAT ? todo.realisedAT.slice(0, 10) : "");
    setUserId(todo.user ? String(todo.user.id) : "none");
  }, [todo]);


  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (!todo || title.trim() === "") {
      return;
    }

    await onSubmit(todo.id, {
      ...buildUpdateTodoInput({ title, description, realisedAt, userId }),
    });
  }

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>Modifier la tache</DialogTitle>

      <DialogContent>
        <Stack component="form" onSubmit={handleSubmit} spacing={2.5} sx={{ pt: 1 }}>
          <TextField
            required
            label="Titre"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />

          <TextField
            multiline
            minRows={3}
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />

          <TextField
            label="Date cible"
            type="date"
            value={realisedAt}
            onChange={(event) => setRealisedAt(event.currentTarget.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="todo-user-select-label">Utilisateur</InputLabel>
            <Select
              label="Utilisateur"
              labelId="todo-user-select-label"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            >
              <MenuItem value="none">Aucun utilisateur</MenuItem>
              {(usersQuery.data ?? []).map((user) => (
                <MenuItem key={user.id} value={String(user.id)}>
                  {user.name ?? user.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {usersQuery.isError && (
            <Alert severity="error">
              {getErrorMessage(
                usersQuery.error,
                "Impossible de charger la liste des utilisateurs pour l'attribution.",
              )}
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          disabled={isSubmitting}
          onClick={(event) => {
            void handleSubmit(event);
          }}
          variant="contained"
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
