import * as express from "express";
import catchAsyncError from "../../../middleware/error/catchAsyncError";

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
    res.json({ message: "register" });
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
