import * as express from "express";
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import {
  findUserByUsername,
  saveUser,
  updateUserPassword,
  userExistsByEmail,
  userExistsByUsername,
} from "../../../model/Stateless/users/users.model";
import { bcryptHash } from "../../../utils/Stateless/bcrypt/bcryptHash";
import { comparePasswords } from "../../../utils/Stateless/bcrypt/bcryptCompare";
import {
  ACCESS_TOKEN_EXPIRATION,
  CUSTOM_SALT_ROUNDS,
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
} from "../../../../config/default";
import { saveToken } from "../../../utils/Stateless/token/saveToken";
import { CookieOptions } from "express";
import AppError from "../../../middleware/error/appError";

/** REGISTER USER */

/** POST: http://localhost:5050/api/v2/auth/register
 * @param : {
 "username" : "codexam_123",
 "password" : "Codexam@123",
 "email": "subham@codexam.com",
 "firstName" : "Subham",
 "lastName": "Maity",
 "mobile": "1234567890",
 "address" : "india",
 "profile": ""
 }
 */
export const register = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // Destructure the request body to get the username, password, profile, and email.
    const { username, password, profile, email } = req.body;
    // Check if the password is provided. If not, return an error message.
    if (!password) {
      return next(new AppError("Password is required", 400));
    }

    try {
      //this function is defined in the model file
      //it checks if the user already exists in the database
      const userExists = await userExistsByUsername(username);
      // If a user with the provided username exists, return an error message.
      if (userExists) {
        return next(new AppError("Username already exists", 400));
      }

      //this function is defined in the model file
      //it checks if the user already exists in the database
      const emailExists = await userExistsByEmail(email);
      // If a user with the provided email exists, return an error message.
      if (emailExists) {
        return next(new AppError("Email already exists", 400));
      }
      //this function is defined in the model file
      const hashedPassword = await bcryptHash(password, CUSTOM_SALT_ROUNDS);

      const user = await saveUser({
        username,
        password: hashedPassword,
        profile: profile || "", //if a profile is not provided, it will be set to an empty string
        email,
      });
      return res.status(201).send({
        message: "User created successfully",
        user,
      });
    } catch (error: any) {
      // Specific error handling for different cases
      if (error.code === 11000) {
        // Handle a specific error case differently
        return next(new AppError("Unable to register user", 500));
      } else {
        // General error handling
        return next(new AppError("Unable to register user", 500));
      }
    }
  },
);

/** LOGIN USER */

/** POST: http://localhost:5050/api/v2/auth/login
 * @param : {
 * "username" : "codexam_123",
 * "password" : "Codexam@123"
 * }
 */

export const login = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // Extract username and password from request body and check if they are provided
    const { username, password } = req.body;

    try {
      //This function is defined in the model file
      // Find the user with the provided username in the database
      const user = await findUserByUsername(username);
      // If no user is found, return an error message.
      if (!user) {
        return next(new AppError("Username not found", 404));
      }

      //This function is defined in the bcryptHelper file
      // If a user is found, compare the provided password with the password in the database
      const passwordCheck = await comparePasswords(password, user.password);

      // If the passwords don't match, return an error message.
      if (!passwordCheck) {
        return next(new AppError("Password does not match", 400));
      }

      // Create a custom payload to send to the client.
      // The payload contains the user's id and username.
      const customPayload = {
        userId: user._id,
        username: user.username,
      };

      // Save the generated tokens in the database
      const tokens = await saveToken(
        customPayload,
        ACCESS_TOKEN_EXPIRATION,
        REFRESH_TOKEN_EXPIRATION,
        REFRESH_TOKEN_EXPIRATION_HASH_SECRET,
      );

      // Define cookie options
      const cookieOptions: CookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Token expiration time
        httpOnly: true, // Cookie accessible only via HTTP(S)
        secure: false, // Set to true if you're using https
        sameSite: "strict", // Restricts cookie to same-site requests
        // You can add more options like domain, path, etc., based on your needs
      };

      // Send the response to the client along with the tokens and set the cookie
      return res
        .status(200)
        .cookie("token", tokens.accessToken, cookieOptions)
        .json({
          msg: "Login Successful...!",
          username: user.username,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
    } catch (error) {
      return next(new AppError("Internal Server Error", 500));
    }
  },
);

/** RESET PASSWORD */

//First you need to generate an OTP and then verify it before resetting the password

/** PUT: http://localhost:5050/api/v2/auth/resetPassword
 * @param : {
 * "username": "codexam_123",
 * "password": "Codexam@123"
 * }
 */

export const resetPassword = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // Check if the resetSession flag is set to true in the app.locals object
      if (!req.app.locals.resetSession) {
        return next(new AppError("Session expired!", 440));
      }

      // Extract the username and password from the request body and check if they are provided
      const { username, password } = req.body;
      // Find the user with the provided username in the database and check if the user exists
      const user = await findUserByUsername(username);

      // If no user is found, return an error message.
      if (!user) {
        return next(new AppError("User not found!", 404));
      }

      // Hash the password before saving it to the database and update the user's password
      const hashedPassword = await bcryptHash(password, CUSTOM_SALT_ROUNDS);

      // Update the user's password in the database
      await updateUserPassword(user.username, hashedPassword);

      // Reset the resetSession flag to false
      req.app.locals.resetSession = false; // Reset session

      // Send the response to the client with a success message
      return res.status(201).send({ msg: "Record Updated!" });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send({ error: error.message });
      } else {
        return res.status(500).send({ error: "Internal Server Error" });
      }
    }
  },
);
