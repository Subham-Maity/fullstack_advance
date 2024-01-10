import * as express from "express";
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import {
  findUserByUsername,
  updateUserById,
} from "../../../model/Stateless/users/users.model";
import AppError from "../../../middleware/error/appError";
import log from "../../../utils/logger/logger";

/** Get User */

/** GET: http://localhost:5050/api/v2/user/example123
 * here example123 - username
 * */

export const getUser = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // get the username from the request parameters
    const { username } = req.params;

    // if the username is not found in the request parameters, then return an error message
    if (!username) {
      return next(new AppError("Invalid Username", 400));
    }

    try {
      // find the user by username in the database
      const user = await findUserByUsername(username);

      // if the user is not found in the database, then return an error message
      if (!user) {
        return next(new AppError("User Not Found", 404));
      }

      // if the user is found in the database, then return the user data without the password
      //First destructure what you want to remove from the object,
      //Then use the rest operator to get the rest of the object
      //toObject() is a mongoose method that converts the mongoose document into a plain JavaScript object that can be modified.
      const { password, ...userData } = user.toObject();

      // return the user data in the response
      res.status(200).json(userData);
    } catch (err) {
      log.error("Failed to get user", err);
      return next(new AppError("Internal Server Error", 500));
    }
  },
);

/** Update User */
/** PUT: http://localhost:5050/api/v2/user/updateuser */
/** @param : {
 *  "header": "Bearer token",
 * }
 * body: {
 * firstName: "Subham",
 * address: "India",
 * profile: "https://www.google.com",
 * }
 */

export const updateUser = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // Extract the userId from the authenticated request

      const userId = req.body.user?.userId as string;
      // const userId = req.body.user as string;

      // Check if the userId is present in the request body
      if (!userId) {
        return next(new AppError("User Not Found", 401));
      }

      // Extract the data to be updated from the request body
      const body = req.body;

      // Update the data for the user identified by userId
      // Update the user data using the updateUserById function from the model
      const updatedUser = await updateUserById(userId, body);

      // Check if any records were modified during the update
      if (!updatedUser) {
        return next(new AppError("Record Not Updated", 400));
      }

      // Send a success response if the record was updated
      res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
      // Handle any errors that occur during the update process
      log.error("Failed to update user", error);
      return next(new AppError("Internal Server Error", 500));
    }
  },
);
