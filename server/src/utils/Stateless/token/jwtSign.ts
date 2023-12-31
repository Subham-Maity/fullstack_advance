import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

export const signJWT = (
  payload: Record<string, any>,
  secret: string,
  options: SignOptions = {},
): string => {
  try {
    return jwt.sign(payload, secret, options);
  } catch (error: any) {
    throw new Error(`Error signing token: ${error.message}`);
  }
};
