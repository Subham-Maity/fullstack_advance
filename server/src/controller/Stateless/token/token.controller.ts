import * as express from "express";
import { verifyRefreshToken } from "../../../utils/Stateless/token/tokenVerify";
import { generateAccessToken } from "../../../utils/Stateless/token/jwtAccess";
import {
  deleteUserTokenById,
  UserToken,
} from "../../../model/Stateless/token/userToken.model";
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
} from "../../../../config/default";
import AppError from "../../../middleware/error/appError";
import log from "../../../utils/logger/logger";

/** POST: http://localhost:5050/api/v2/auth/token
 * @param : {
 *     "refreshToken":"sdflsjfjlsdjfl"
 * }
 */
export const generateAccessTokenHandler = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      //It will find the token in the request body
      const { refreshToken } = req.body; // Assuming refreshToken is sent in the request body

      //If the token is not found in the database, it will return an error message
      if (!refreshToken) {
        return next(new AppError("Refresh token is required", 400));
      }

      //It will find the token in the database
      const { tokenDetails } = await verifyRefreshToken(
        refreshToken,
        REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
      );

      //it will print the token details in the console log

      /** console.log(JSON.stringify(tokenDetails, null, 2));
       * Output:
         "userId": "6590bff25ff4bb7162679c22",
          "username": "neSSwaS1Sy22d3SSS",
          "iat": 1703987803,
          "exp": 1704074203
      */

      //If the token is not found in the database, it will return an error message
      if (!tokenDetails) {
        return next(new AppError("Invalid refresh token", 400));
      }

      //It will find the token in the database
      const payload = {
        userId: tokenDetails.userId,
        username: tokenDetails.username,
      };

      //It will generate the access token based on the payload
      const accessToken = generateAccessToken(payload, ACCESS_TOKEN_EXPIRATION);

      //It will find the token in the database
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    } catch (err) {
      log.error("Failed to generate access token", err);
      return next(new AppError("Failed to generate access token", 400));
    }
  },
);

/** DELETE: http://localhost:5050/api/v2/auth/token
 * @param : {
 *     "refreshToken":"sdflsjfjlsdjfl"
 * }
 */
export const logoutHandler = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
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
      log.error("Failed to logout user", err);
      return next(new AppError("Internal Server Error", 500));
    }
  },
);
