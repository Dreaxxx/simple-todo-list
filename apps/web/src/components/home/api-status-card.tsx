import { useQuery } from "@tanstack/react-query";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import { Alert, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

type HealthResponse = {
  status: string;
};

async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch("http://localhost:3000/api/health");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export function ApiStatusCard() {
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  const chip = healthQuery.isLoading ? (
    <Chip
      color="default"
      icon={<SyncRoundedIcon />}
      label="Connexion..."
      variant="outlined"
    />
  ) : healthQuery.isError ? (
    <Chip
      color="error"
      icon={<ErrorOutlineRoundedIcon />}
      label="API indisponible"
    />
  ) : (
    <Chip
      color="success"
      icon={<CheckCircleRoundedIcon />}
      label={`API ${healthQuery.data!.status}`}
    />
  );

  return (
    <Card>
      <CardContent>
        <Stack
          alignItems={{ xs: "flex-start", sm: "center" }}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <div>
            <Typography variant="h6">Etat de l'API</Typography>
            <Typography color="text.secondary" variant="body2">
              Verification rapide de la connexion backend avant de gerer les todos.
            </Typography>
          </div>
          {chip}
        </Stack>

        {healthQuery.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Impossible de joindre l'API pour le moment.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
