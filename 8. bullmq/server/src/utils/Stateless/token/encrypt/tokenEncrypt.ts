import * as crypto from "crypto";

export const hashToken = (token: string, secret: string): string => {
  // Hash the token using the secret key
  return crypto.createHmac("sha256", secret).update(token).digest("hex");
};
