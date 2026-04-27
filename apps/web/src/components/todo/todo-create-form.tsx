import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";

type TodoCreateFormProps = {
  title: string;
  description: string;
  realisedAt: string;
  isSubmitting: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onRealisedAtChange: (value: string) => void;
  onSubmit: (event: SyntheticEvent) => Promise<void>;
};

export function TodoCreateForm({
  title,
  description,
  realisedAt,
  isSubmitting,
  onTitleChange,
  onDescriptionChange,
  onRealisedAtChange,
  onSubmit,
}: TodoCreateFormProps) {

  return (
    <Card>
      <CardContent>
        <Stack component="form" spacing={2.5} onSubmit={onSubmit}>
          <div>
            <Typography variant="h5">Ajouter une tache</Typography>
            <Typography color="text.secondary" variant="body2">
              Ajout simple d'une tache a la todo list.
            </Typography>
          </div>

          <TextField
            required
            label="Titre"
            placeholder="Ex: Finaliser la page Todo"
            value={title}
            onChange={(event) => onTitleChange(event.currentTarget.value)}
          />

          <TextField
            multiline
            minRows={3}
            label="Description"
            placeholder="Ajoute quelques details si besoin"
            value={description}
            onChange={(event) => onDescriptionChange(event.currentTarget.value)}
          />

          <TextField
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label="Date cible"
            type="date"
            value={realisedAt}
            onChange={(event) => onRealisedAtChange(event.currentTarget.value)}
          />

          <Button
            disabled={isSubmitting}
            startIcon={<AddTaskRoundedIcon />}
            type="submit"
            variant="contained"
          >
            {isSubmitting ? "Creation..." : "Ajouter la tache"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
