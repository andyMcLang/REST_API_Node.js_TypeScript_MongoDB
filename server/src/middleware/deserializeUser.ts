import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken =
    get(req, "cookies.refreshToken") ||
    (get(req, "headers.x-refresh") as string);

  if (!accessToken) {
    return next(); // Ei tokenia
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      // 🔧 Tämä oli virheellinen:
      // res.cookie("accessToken", accessToken, { ... });

      // ✅ Tämä on oikea:
      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15 min
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      });

      const result = verifyJwt(newAccessToken);
      if (result.decoded) {
        res.locals.user = result.decoded;
      }
    }
  }

  return next();
};

export default deserializeUser;
