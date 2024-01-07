import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../../error/catchAsyncError";
import ENV from "../../../../config/default";
import { verifyJWT } from "../../../utils/Stateless/token/tokenSign&Verify/jwtVerify";
import AppError from "../../error/appError";

/** Auth middleware */
export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    // Access the Authorization header to validate the request
    const authHeader = req.headers.authorization;

    // If the Authorization header is not present, return an error message
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "No Authorization header present!" });
    }

    // Split the Authorization header to retrieve the token from the header
    //example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ...
    //The token is the second element in the array after splitting the header, so we use [1]
    const token = authHeader.split(" ")[1];

    // If the token is not present, return an error message
    if (!token) {
      return next(new AppError("No token present!", 401));
    }

    // Verify the token
    try {
      // Retrieve user details for the logged-in user
      // Attach user details to the request object
      req.body.user = await verifyJWT(token, ENV.JWT_ACCESS_TOKEN);
      next(); // Proceed to the next middleware
    } catch (error) {
      // If the token is invalid, return an error message
      return res.status(401).json({ error: "Invalid token!" });
    }
  },
);
