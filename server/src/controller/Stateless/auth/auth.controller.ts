import * as express from "express";
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import UserModel, {
  userExistsByEmail,
  userExistsByUsername,
} from "../../../model/Stateless/users/users.model";
import { bcryptHelper } from "../../../utils/Stateless/bcryptHelper/bcryptHelper";

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
    const customSaltRounds = 10;
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
      const hashedPassword = await bcryptHelper(password, customSaltRounds);
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
    res.json({ message: "login" });
  },
);

/** VERIFY USER */

/** GET: http://localhost:5050/api/v2/auth/verify
 * @param : {
 * "username" : "codexam_123",
 * "password" : "Codexam@123"
 * }
 */

export const verifyUser = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "verify" });
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
