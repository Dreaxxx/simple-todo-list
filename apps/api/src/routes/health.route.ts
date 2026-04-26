import { Hono } from "hono";
import { prisma } from "../lib/prisma";
import { handleRouteError } from "./helpers/route.errors";
import { jsonSuccess } from "./helpers/route.responses";

const healthRouter = new Hono();

healthRouter.get("/", async (c) => {
	try {
		await prisma.$queryRaw`SELECT 1`;
		return jsonSuccess(c, { status: "ok" });
	} catch (error) {
		return handleRouteError(c, error);
	}
});

export default healthRouter;
