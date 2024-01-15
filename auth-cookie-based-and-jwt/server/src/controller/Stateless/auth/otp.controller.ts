import * as express from "express";
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import otpGenerator from "otp-generator";
import AppError from "../../../middleware/error/appError";
import log from "../../../utils/logger/logger";
/** GENERATE OTP */
/** GET: http://localhost:5050/api/v2/auth/generateOTP?username=codexam_123
 * @param : {
 * "username": "codexam_123",
 * }
 */

export const generateOTP = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // Generate a 6-digit OTP
      const OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      if (!OTP) {
        // If OTP generation fails, handle the error
        return next(new AppError("Failed to generate OTP", 500));
      }

      // Store the OTP in the request object
      req.app.locals.OTP = OTP;

      // Send the OTP as a response
      res.status(201).json({ code: OTP }); //code is the name of the variable that will be used in the frontend
      log.info("OTP generated successfully" + OTP);
    } catch (error) {
      // Handle other potential errors
      return next(new AppError("Failed to process OTP request", 500));
    }
  },
);

/** Validate OTP */
/** GET: http://localhost:5050/api/v2/auth/verifyOTP?username=codexam_123&code=427638
 *  @param : {
 *  "username": "codexam_123",
 *  "code": "427638"
 *  }
 * */

export const verifyOTP = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    const { code } = req.query; //code is passed as a query parameter

    // Ensure 'code' exists and is a string before performing operations
    if (
      typeof code === "string" &&
      parseInt(req.app.locals.OTP) === parseInt(code)
    ) {
      req.app.locals.OTP = null; // Reset the OTP value
      //after verifying if you send the same OTP again, it will not be verified
      //because the OTP value has been reset to null
      req.app.locals.resetSession = true; // Start session for reset password
      return res.status(201).json({ msg: "Verification Successful!" });
    }

    return res.status(400).json({ error: "Invalid OTP" });
  },
);
