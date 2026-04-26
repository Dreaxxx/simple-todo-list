import { Container, Stack } from "@mui/material";
import { ApiStatusCard } from "../components/home/api-status-card";
import TodoPage from "./Todo";

export default function Home() {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
            <Stack spacing={3}>
                <ApiStatusCard />
                <TodoPage />
            </Stack>
        </Container>
    );
}
