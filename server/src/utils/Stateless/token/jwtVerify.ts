import * as jwt from "jsonwebtoken";
import { VerifyOptions } from "jsonwebtoken";

export const verifyJWT = (
  token: string,
  secret: string,
  options: VerifyOptions = {},
): any => {
  try {
    return jwt.verify(token, secret, options);
  } catch (error: any) {
    throw new Error(`Error verifying token: ${error.message}`);
  }
};
