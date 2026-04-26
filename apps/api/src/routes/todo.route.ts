import { Hono } from "hono";
import todoService from "../services/todo.service";
import { handleRouteError } from "./helpers/route.errors";
import { parseId } from "./helpers/route.params";

const todoRouter = new Hono().basePath("/todo");

todoRouter.get("/", async (c) => {
    try {
        const todos = await todoService.readAll();
        return c.json({ status: "ok", data: todos });
    } catch (error) {
        return handleRouteError(c, error);
    }
});

todoRouter.get("/:id", async (c) => {
    try {
        const todo = await todoService.readOne(parseId(c.req.param("id")));
        return c.json({ status: "ok", data: todo });
    } catch (error) {
        return handleRouteError(c, error);
    }
});

todoRouter.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const todo = await todoService.create(body);
        return c.json({ status: "ok", data: todo }, 201);
    } catch (error) {
        return handleRouteError(c, error);
    }
});

todoRouter.patch("/:id", async (c) => {
    try {
        const body = await c.req.json();
        const todo = await todoService.update(parseId(c.req.param("id")), body);
        return c.json({ status: "ok", data: todo });
    } catch (error) {
        return handleRouteError(c, error);
    }
});

todoRouter.delete("/:id", async (c) => {
    try {
        const todo = await todoService.remove(parseId(c.req.param("id")));
        return c.json({ status: "ok", data: todo });
    } catch (error) {
        return handleRouteError(c, error);
    }
});

export default todoRouter;
