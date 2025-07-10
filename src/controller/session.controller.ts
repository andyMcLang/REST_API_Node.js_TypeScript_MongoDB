import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Tarkistetaan käyttäjän tunnukset
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Virheellinen sähköposti tai salasana");
  }

  if (!("_id" in user)) {
    return res.status(500).send("Käyttäjältä puuttuu _id");
  }

  // Luodaan istunto (session)
  const session = await createSession(
    user._id as string,
    req.get("user-agent") || ""
  );

  // Luodaan access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // Luodaan refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // return access & refresh tokens

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });

  console.log({ sessions });
  return res.send(sessions);
}
