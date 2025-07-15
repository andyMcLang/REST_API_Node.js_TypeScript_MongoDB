import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  try {
    const user = await createUser(req.body); // kutsutaan createUser-funktiota käyttäjän luomiseksi
    return res.status(201).send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  const user = res.locals.user;

  if (!user) {
    return res.status(401).send("Ei kirjautunut käyttäjä");
  }

  return res.send(user);
}
