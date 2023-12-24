import express from "express";
import { deleteUserById, getUserById, getUsers } from "../../model/users/users";
import catchAsyncError from "../../middleware/error/catchAsyncError"; /* FETCH ALL USERS */

/* FETCH ALL USERS */
export const getAllUsers = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      //Get all users from database and return them
      const users = await getUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  },
);

/* DELETE USER */
export const deleteUser = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      //Get the id from the request parameters
      const { id } = req.params;

      //Delete the user from the database
      const deletedUser = await deleteUserById(id);

      //Return the deleted user
      return res.json(deletedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  },
);

/* UPDATE USER */
export const updateUser = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      //Get the id from the request parameters
      const { id } = req.params;
      //Get the username from the request body
      const { username } = req.body;

      //If the username is missing, it will return a 400 status code
      if (!username) {
        return res.sendStatus(400);
      }

      //Get the user from the database
      const user: any = await getUserById(id);

      //Update the username
      user.username = username;
      //Save the user in the database
      await user.save();

      //Return the updated user
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  },
);
