import catchAsyncError from "../../../middleware/error/catchAsyncError";
import * as express from "express";
import { findUserByUsername } from "../../../model/Stateless/users/users.model";

//We will use this middleware to verify if the user exists in the database after the user has entered their username.
/** VERIFY USER */

/** GET: http://localhost:5050/api/v2/auth/verify
 * @param : {
 * "username" : "codexam_123",
 * "password" : "Codexam@123"
 * }
 */

/**
 * Security Enhancement: Verifying the existence of a user before allowing access to log-in
 * or authentication routes can prevent unnecessary login attempts for non-existing users.
 * Optimization: Reducing database queries by checking user
 * existence before processing certain routes can optimize performance.
 */
export const verifyUser = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // get the username from the request body
      // if the request method is GET, then get the username from the request query instead of the request body
      // this is because we will be using GET requests to verify the user in the frontend
      const { username } = req.method == "GET" ? req.query : req.body;

      // check the user existence
      const userExists = await findUserByUsername(username);
      // if user not exists then return an error message
      if (!userExists) {
        return res.status(404).send({ error: "User not found" }); // Generic error for non-existing user
      }
      next(); // User exists, proceed to the next middleware
    } catch (error) {
      return res.status(500).send({ error: "Authentication Error" }); // Generic error for any authentication-related issue
    }
  },
);
