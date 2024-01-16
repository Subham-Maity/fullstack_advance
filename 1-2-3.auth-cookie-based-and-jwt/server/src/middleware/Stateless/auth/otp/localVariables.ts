import * as express from "express";
import catchAsyncError from "../../../error/catchAsyncError";

//We want to access the OTP and resetSession variables from anywhere in the application,
//so we will use the app.locals object to store them.
export const localVariables = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      req.app.locals = {
        OTP: null, //This will store the OTP value
        resetSession: false, //This will store the resetSession value
      };
      next();
    } catch (error) {
      next(error); // Pass any caught error to the next middleware
    }
  },
);
