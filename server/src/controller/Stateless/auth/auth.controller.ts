import * as express from "express";
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import UserModel, {
  findUserByUsername,
  userExistsByEmail,
  userExistsByUsername,
} from "../../../model/Stateless/users/users.model";
import { bcryptHash } from "../../../utils/Stateless/bcrypt/bcryptHash";
import { comparePasswords } from "../../../utils/Stateless/bcrypt/bcryptCompare";
import { CUSTOM_SALT_ROUNDS } from "../../../../config/default";
import { saveToken } from "../../../utils/Stateless/token/saveToken";
import { CookieOptions } from "express";

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
  async (req: express.Request, res: express.Response) => {
    // Destructure the request body to get the username, password, profile, and email.
    const { username, password, profile, email } = req.body;
    // Check if the password is provided. If not, return an error message.
    if (!password) {
      return res.status(400).send({ error: "Password is required" });
    }

    try {
      //this function is defined in the model file
      //it checks if the user already exists in the database
      const userExists = await userExistsByUsername(username);
      // If a user with the provided username exists, return an error message.
      if (userExists) {
        return res.status(400).send({ error: "Username already exists" });
      }

      //this function is defined in the model file
      //it checks if the user already exists in the database
      const emailExists = await userExistsByEmail(email);
      // If a user with the provided email exists, return an error message.
      if (emailExists) {
        return res.status(400).send({ error: "Email already exists" });
      }
      //this function is defined in the model file
      const hashedPassword = await bcryptHash(password, CUSTOM_SALT_ROUNDS);
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "", //if a profile is not provided, it will be set to an empty string
        email,
      });

      const result = await user.save();
      return res.status(201).send({
        message: "User created successfully",
        result,
      });
    } catch (error: any) {
      // Specific error handling for different cases
      if (error.code === "SOME_SPECIFIC_ERROR_CODE") {
        // Handle a specific error case differently
        return res.status(500).send({ error: "Specific error occurred" });
      } else {
        // General error handling
        return res.status(500).send({ error: "Unable to register user" });
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
  async (req: express.Request, res: express.Response) => {
    // Extract username and password from request body and check if they are provided
    const { username, password } = req.body;

    try {
      //This function is defined in the model file
      // Find the user with the provided username in the database
      const user = await findUserByUsername(username);
      // If no user is found, return an error message.
      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      //This function is defined in the bcryptHelper file
      // If a user is found, compare the provided password with the password in the database
      const passwordCheck = await comparePasswords(password, user.password);

      // If the passwords don't match, return an error message.
      if (!passwordCheck) {
        return res.status(400).send({ error: "Password does not match" });
      }

      // Create a custom payload to send to the client.
      // The payload contains the user's id and username.
      const customPayload = {
        userId: user._id,
        username: user.username,
      };

      // Save the generated tokens in the database
      const tokens = await saveToken(customPayload);

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
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
);

/** GENERATE OTP */
/** GET: http://localhost:5050/api/v2/auth/generateOTP
 * @param : {
 * "username": "codexam_123",
 * "password": "Codexam@123"
 * }
 */

export const generateOTP = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "generateOTP" });
  },
);

/** Validate OTP */
/** GET: http://localhost:5050/api/v2/auth/createResetSession */

export const verifyOTP = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "validateOTP" });
  },
);

/** RESET PASSWORD */

/** PUT: http://localhost:5050/api/v2/auth/resetPassword
 * @param : {
 * "username": "codexam_123",
 * "password": "Codexam@123"
 * }
 */

export const resetPassword = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "resetPassword" });
  },
);

/** SESSION CREATE */

/** GET: http://localhost:5050/api/v2/auth/createResetSession */

export const createResetSession = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "createResetSession" });
  },
);
