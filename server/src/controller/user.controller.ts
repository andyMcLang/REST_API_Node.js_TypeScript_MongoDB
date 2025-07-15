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
    if (e.code === 11000) {
      return res.status(409).send({
        message: "Sähköposti on jo käytössä.",
      });
    }
    return res.status(500).send({
      message: "Jokin meni pieleen",
    });
  }
}
