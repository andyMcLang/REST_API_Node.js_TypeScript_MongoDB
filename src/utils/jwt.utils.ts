import fs from "fs";
import jwt from "jsonwebtoken";
import config from "config";
import { error } from "console";

const privateKey = fs.readFileSync(
  process.env.PRIVATE_KEY_PATH as string,
  "utf8"
);
const publicKey = fs.readFileSync(
  process.env.PUBLIC_KEY_PATH as string,
  "utf8"
);

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
