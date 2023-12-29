import * as express from "express";
import { verifyRefreshToken } from "../../../utils/Stateless/token/tokenVerify";
import { generateAccessToken } from "../../../utils/Stateless/token/jwtAccess";
import {
  deleteUserTokenById,
  UserToken,
} from "../../../model/Stateless/token/userToken.model";
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import { ACCESS_TOKEN_EXPIRATION } from "../../../../config/default";

/** POST: http://localhost:5050/api/v2/auth/token
 * @param : {
 *     "refreshToken":"sdflsjfjlsdjfl"
 * }
 */
export const generateAccessTokenHandler = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      //It will find the token in the request body
      const { refreshToken } = req.body; // Assuming refreshToken is sent in the request body

      //If the token is not found in the database, it will return an error message
      if (!refreshToken) {
        return res
          .status(400)
          .json({ error: true, message: "Refresh token is required" });
      }

      //It will find the token in the database
      const { tokenDetails } = await verifyRefreshToken(refreshToken);

      //If the token is not found in the database, it will return an error message
      if (!tokenDetails) {
        return res
          .status(400)
          .json({ error: true, message: "Invalid refresh token" });
      }

      //It will find the token in the database
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };

      //It will generate the access token based on the payload
      const accessToken = generateAccessToken(payload, ACCESS_TOKEN_EXPIRATION);

      //It will find the token in the database
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ error: true, message: "Failed to generate access token" });
    }
  },
);

/** DELETE: http://localhost:5050/api/v2/auth/token
 * @param : {
 *     "refreshToken":"sdflsjfjlsdjfl"
 * }
 */
export const logoutHandler = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      //It will find the token in the request body
      const userToken = await UserToken(req.body.refreshToken);
      //If the token is not found in the database, it will return an error message
      if (!userToken) {
        return res
          .status(200)
          .json({ error: false, message: "Logged Out Successfully" });
      }
      //It will delete the token in the database based on the userId
      await deleteUserTokenById(userToken.userId);

      //It will delete the token in the database based on the userId
      res
        .status(200)
        .json({ error: false, message: "Logged Out Successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  },
);
