import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  if (!("_id" in user)) {
    return res.status(500).send("User object missing _id");
  }
  // create a session
  const session = await createSession(
    user._id as string,
    req.get("user-agent") || ""
  );
  // create an access token

  const accessToken = signJwt(
    { ...user, session: (await session)._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  // return access & refresh tokens
}
