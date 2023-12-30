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

export const verifyUser = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { username } = req.method == "GET" ? req.query : req.body;

      // check the user existence
      let exist = await findUserByUsername(username);
      // if user not exists then return an error message
      if (!exist) return res.status(404).send({ error: "Can't find User!" });
      next();
    } catch (error) {
      return res.status(404).send({ error: "Authentication Error" });
    }
  },
);
