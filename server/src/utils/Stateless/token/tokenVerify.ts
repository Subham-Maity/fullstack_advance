import { UserToken } from "../../../model/Stateless/token/userToken.model";
import ENV from "../../../../config/default";
import { hashToken } from "./tokenEncrypt";
import { verifyJWT } from "./jwtVerify";

export const verifyRefreshToken = async (
  refreshToken: string,
  refreshTokenExpirationHashSecret: string,
): Promise<any> => {
  //This is the private key that will be used to verify the token.
  const privateKey = ENV.JWT_REFRESH_TOKEN;

  //This function will generate a hash of the refresh token.
  //For extra security, we will use a different secret key to generate the hash.
  try {
    const refreshTokenHash = hashToken(
      refreshToken,
      refreshTokenExpirationHashSecret,
    );

    //This function will find the refresh token in the database.
    const userToken = await UserToken(refreshTokenHash);

    //If the token is not found in the database, it will return an error message.
    if (!userToken) {
      throw new Error("Invalid refresh token");
    }
    //It will give you the user ID and username from the token.
    const tokenDetails = verifyJWT(refreshToken, privateKey);

    return { tokenDetails, error: false, message: "Valid refresh token" };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
