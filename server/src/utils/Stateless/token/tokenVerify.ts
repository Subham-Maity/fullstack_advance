import * as jwt from "jsonwebtoken";
import { UserToken } from "../../../model/Stateless/token/userToken.model";
import ENV, {
  REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
} from "../../../../config/default";
import { hashToken } from "./tokenEncrypt";

export const verifyRefreshToken = async (
  refreshToken: string,
): Promise<any> => {
  //This is the private key that will be used to verify the token.
  const privateKey = ENV.JWT_SECRET_TOKEN;

  //This function will generate a hash of the refresh token.
  //For extra security, we will use a different secret key to generate the hash.
  try {
    const refreshTokenHash = hashToken(
      refreshToken,
      REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
    );

    //This function will find the refresh token in the database.
    const userToken = await UserToken(refreshTokenHash);
    //If the token is not found in the database, it will return an error message.
    if (!userToken) {
      throw new Error("Invalid refresh token");
    }
    //If the token is found in the database, it will return the token details.
    const tokenDetails = jwt.verify(refreshToken, privateKey);
    return { tokenDetails, error: false, message: "Valid refresh token" };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
