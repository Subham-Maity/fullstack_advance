import { signJWT } from "../tokenSign&Verify/jwtSign";
import { JWT_REFRESH_TOKEN_GENERATOR } from "../tokenConfig";
// Refresh Token generation function

export const generateRefreshToken = (
  payload: Record<string, any>,
  expiresIn: string = "24h",
): string => {
  try {
    // Set a longer expiration for the refresh token
    // Save the refresh token in a secure way (database, in-memory store, etc.)
    // Return the generated refresh token
    return signJWT(payload, JWT_REFRESH_TOKEN_GENERATOR, { expiresIn });
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};
