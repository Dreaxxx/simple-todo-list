import { useQuery } from "@tanstack/react-query";
import TodoPage from "./Todo";

export default function Home() {

    const fetchHealth = async () => {
        const response = await fetch("http://localhost:3000/api/health");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    };

    const query = useQuery({
        queryKey: ['health'],
        queryFn: fetchHealth,
    })

    
    return (
        <div>
            {query.isLoading ? (
                <p>Loading...</p>
            ) : query.isError ? (
                <p>Error: {query.error.message}</p>
            ) : (
                <p>Api: {query.data.status}</p>
            )}
            <section>
                <TodoPage />
            </section>
        </div>
    );
}