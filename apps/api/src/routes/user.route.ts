import { Hono } from "hono";
import userService from "../services/user.service";
import { handleRouteError } from "./helpers/route.errors";
import { jsonSuccess } from "./helpers/route.responses";

const userRouter = new Hono().basePath("/user");

userRouter.get("/", async (c) => {
  try {
    const users = await userService.readAll();
    return jsonSuccess(c, users);
  } catch (error) {
    return handleRouteError(c, error);
  }
});

export default userRouter;
