import * as jwt from "jsonwebtoken";
import ENV from "../../../../config/default";
// Refresh Token generation function

export const generateRefreshToken = (
  payload: Record<string, any>,
  expiresIn: string = "24h",
): string => {
  try {
    // Set a longer expiration for the refresh token
    // Save the refresh token in a secure way (database, in-memory store, etc.)
    // Return the generated refresh token
    return jwt.sign(payload, ENV.JWT_SECRET_TOKEN, { expiresIn });
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
};
