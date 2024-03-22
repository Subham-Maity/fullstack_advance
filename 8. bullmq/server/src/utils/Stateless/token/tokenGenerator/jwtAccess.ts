import { signJWT } from "../tokenSign&Verify/jwtSign";
import { JWT_ACCESS_TOKEN_GENERATOR } from "../tokenConfig";
//generateToken function that takes in a generic payload object
// and automatically generates a token based on that payload.
export const generateAccessToken = (
  payload: Record<string, any>,
  expiresIn: string = "24h",
): string => {
  try {
    //this function takes in a payload and a secret key and generates a token based on that payload.
    return signJWT(payload, JWT_ACCESS_TOKEN_GENERATOR, { expiresIn });
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};
