import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import { Chip, Stack, Typography } from "@mui/material";

type TodoHeaderProps = {
  totalCount: number;
};

export function TodoHeader({ totalCount }: TodoHeaderProps) {
  return (
    <Stack spacing={2}>
      <Chip
        color="secondary"
        icon={<AssignmentTurnedInRoundedIcon />}
        label="Todo list simpliste avec Mui et Tanstack Query"
        sx={{ width: "fit-content" }}
      />

      <div>
        <Typography sx={{ mb: 1 }} variant="h3">
          Todo List
        </Typography>
        <Typography color="text.secondary" variant="body1">
          Une interface claire pour creer, filtrer et attribuer des taches et les assigner a des utilisateurs.
        </Typography>
      </div>

      <Typography color="text.secondary" variant="body2">
        {totalCount} todo(s) actuellement listée(s)
      </Typography>
    </Stack>
  );
}
