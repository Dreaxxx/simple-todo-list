import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import type { Todo } from "../../types/todo.type";
import { formatDate } from "../../utils/dates/date.format";

type TodoCardProps = {
  todo: Todo;
  actions?: ReactNode;
};

export function TodoCard({ todo, actions }: TodoCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip
              color={todo.user ? "primary" : "warning"}
              icon={<PersonOutlineRoundedIcon />}
              label={todo.user?.name ?? "Non attribuée"}
              variant={todo.user ? "filled" : "outlined"}
            />
            <Chip
              color={new Date(todo.realisedAT) <= new Date() ? "error" : "success"}
              icon={<CalendarMonthRoundedIcon />}
              label={formatDate(todo.realisedAT)}
              variant="outlined"
            />
          </Stack>

          <div>
            <Typography gutterBottom variant="h6">
              {todo.title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {todo.description ?? "Pas de description pour le moment."}
            </Typography>
          </div>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        {actions ?? (
          <Button
            disabled
            size="small"
            startIcon={<EditRoundedIcon />}
            variant="text"
          >
            Edition Soon TM
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
