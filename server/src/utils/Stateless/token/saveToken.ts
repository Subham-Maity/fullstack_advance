import { generateAccessToken } from "./jwtAccess";
import { generateRefreshToken } from "./jwtRefresh";

import {
  createUserToken,
  deleteUserTokenById,
  findUserTokenById,
} from "../../../model/Stateless/token/userToken.model";
import { hashToken } from "./tokenEncrypt";

export const saveToken = async (
  payload: Record<string, any>,
  accessTokenExpiration: string,
  refreshTokenExpiration: string,
  refreshTokenExpirationHashSecret: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    // Generate tokens using the functions imported from jwtAccess
    //This function will generate an access token based on the payload and the secret key.
    const accessToken = generateAccessToken(payload, accessTokenExpiration);
    //This function will generate a refresh token based on the payload and the secret key.
    const refreshToken = generateRefreshToken(payload, refreshTokenExpiration);

    // Create a hash of the refresh token
    const refreshTokenHash = hashToken(
      refreshToken,
      refreshTokenExpirationHashSecret,
    );

    // Find if the user already has a refresh token in the database
    const existingUserToken = await findUserTokenById(payload.userId);

    // If the user already has a refresh token, delete it from the database
    if (existingUserToken) {
      await deleteUserTokenById(payload.userId);
    }
    // Save the new refresh token for the user in the database
    await createUserToken(payload.userId, refreshTokenHash);

    // Return the generated tokens
    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};
