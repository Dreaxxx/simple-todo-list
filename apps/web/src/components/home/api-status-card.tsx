import { useQuery } from "@tanstack/react-query";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import { Alert, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { fetchJson } from "../../utils/api/api-client";
import { getErrorMessage } from "../../utils/errors/error-message";

type HealthResponse = {
  status: string;
};


async function fetchHealth(): Promise<HealthResponse> {
  return fetchJson<HealthResponse>("/health");
}

export function ApiStatusCard() {
  const healthQuery = useQuery<HealthResponse, Error>({
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
            {getErrorMessage(
              healthQuery.error,
              "L'API ne repond pas pour le moment.",
            )}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
