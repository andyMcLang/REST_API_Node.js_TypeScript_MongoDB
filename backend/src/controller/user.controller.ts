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
    const safeUser = omit(user.toJSON(), "password");

    return res.status(201).json(safeUser);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
