import { Hono } from "hono";
import { SQL } from "bun";

const healthRouter = new Hono();

healthRouter.get("/", async (c) => {
	const postgres = new SQL("postgres://user:password@127.0.0.1:5432/monorepo");
	const postgresResults = await postgres`SELECT * FROM pg_tables`;

	return c.json({ status: "ok", tables: postgresResults });
});

export default healthRouter;