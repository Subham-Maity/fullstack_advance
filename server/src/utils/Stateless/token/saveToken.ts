import { generateAccessToken } from "./jwtAccess";
import { generateRefreshToken } from "./jwtRefresh";
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
} from "../../../../config/default";
import {
  createUserToken,
  deleteUserTokenById,
  findUserTokenById,
} from "../../../model/Stateless/token/userToken.model";
import { hashToken } from "./tokenEncrypt";

export const saveToken = async (user: any) => {
  try {
    // Generate tokens using the functions imported from jwtAccess
    //This function will generate an access token based on the payload and the secret key.
    const accessToken = generateAccessToken(user, ACCESS_TOKEN_EXPIRATION);
    //This function will generate a refresh token based on the payload and the secret key.
    const refreshToken = generateRefreshToken(user, REFRESH_TOKEN_EXPIRATION);

    // Create a hash of the refresh token
    const refreshTokenHash = hashToken(
      refreshToken,
      REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
    );

    // Find if the user already has a refresh token in the database
    const existingUserToken = await findUserTokenById(user.userId);

    // If the user already has a refresh token, delete it from the database
    if (existingUserToken) {
      await deleteUserTokenById(user.userId);
    }
    // Save the new refresh token for the user in the database
    await createUserToken(user.userId, refreshTokenHash);

    // Return the generated tokens
    return { accessToken, refreshToken };
  } catch (error: any) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};
