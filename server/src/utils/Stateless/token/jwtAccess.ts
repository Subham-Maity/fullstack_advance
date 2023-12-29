import * as jwt from "jsonwebtoken";
import ENV from "../../../../config/default";
//generateToken function that takes in a generic payload object
// and automatically generates a token based on that payload.
export const generateAccessToken = (
  payload: Record<string, any>,
  expiresIn: string = "24h",
): string => {
  try {
    //this function takes in a payload and a secret key and generates a token based on that payload.
    return jwt.sign(payload, ENV.JWT_ACCESS_TOKEN, { expiresIn });
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};
