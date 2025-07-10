import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResourse from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createUserSessionHandler } from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResourse(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResourse(createSessionSchema),
    createUserSessionHandler
  );
}

export default routes;
