import { Hono } from "hono";
import { cors } from "hono/cors";
import healthRouter from "./routes/health.route";
import todoRouter from "./routes/todo.route";
import userRouter from "./routes/user.route";

const PREFIX = "/api";

// --

const app = new Hono();

app.use(`${PREFIX}/*`, cors());

app.route(`${PREFIX}/health`, healthRouter);
app.route(`${PREFIX}`, todoRouter);
app.route(`${PREFIX}`, userRouter);

export default {
	port: 3000,
	fetch: app.fetch,
};
