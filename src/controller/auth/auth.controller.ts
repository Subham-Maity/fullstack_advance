import express from "express";
import { createUser, getUserByEmail } from "../../model/users/users";
import { authentication, random } from "../../utils/crypto/crypt";
import { IUser } from "../../types/user/user";
import catchAsyncError from "../../middleware/error/catchAsyncError";
import log from "../../utils/logger/logger";
import { session_Token } from "../../../config/default";

/*LOGIN USER*/
export const login = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      //It will request the email and password from the HTTP request body
      const { email, password } = req.body;

      //If either the email or password is missing, it will return a 400 status code
      //400 status code means that the request is malformed or invalid
      if (!email || !password) {
        return res.sendStatus(400);
      }

      //Fetches the user from the database by email
      //Specifies that the returned user object should contain the salt and password fields from the authentication section. Moreover,
      // it will help us to compare the hash stored in the database with the hash generated from the salt and password provided by the user
      const user: IUser = await getUserByEmail(email).select(
        "+authentication.salt +authentication.password",
      );

      //If the user doesn't exist, it will return a 400 status code
      if (!user) {
        return res.sendStatus(400);
      }

      //❗IMPORTANT❗
      //It will generate a hash from the salt and password provided by the user
      //authentication return a hash
      const expectedHash = await authentication(
        user.authentication.salt,
        password,
      );

      //If the hash doesn't match the hash stored in the database, it will return a 403 status code
      if (user.authentication.password != expectedHash) {
        return res.sendStatus(403);
      }

      //If the user exists, it will generate a new session token for the user
      const salt = random();

      //it will generate a new session token for the user
      user.authentication.sessionToken = await authentication(
        salt,
        user._id.toString(),
      );

      //it will save the user in the database
      await user.save();

      //it will set the cookie with the session token in the response header
      //Basically, it will set the cookie with the session token in the browser
      res.cookie(session_Token, user.authentication.sessionToken, {
        //SUBHAM-AUTH is the name of the cookie that will be set in the browser
        domain: "localhost", //the domain of the cookie
        path: "/", //the path of the cookie
      });

      //it will return the user object
      return res.status(200).json(user).end();
    } catch (error) {
      log.info(`Error: ${error}`);
      return res.sendStatus(400);
    }
  },
);

/*REGISTER USER*/

export const register = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      //It will request the email, password, and username from the HTTP request body
      const { email, password, username } = req.body;

      //If either the email, password, or username is missing, it will return a 400 status code
      if (!email || !password || !username) {
        return res.sendStatus(400);
      }

      //Fetches the user from the database by email to check if the user already exists
      const existingUser = await getUserByEmail(email);

      //If the user already exists, it will return a 400 status code
      if (existingUser) {
        return res.sendStatus(400);
      }

      //Generates a new salt for the user
      const salt = random();

      //❗IMPORTANT❗

      //Creates a new user in the database with the specified email, username, salt, and password
      const user: IUser = await createUser({
        email,
        username,
        authentication: {
          salt, //the salt is stored in the database
          //authentication return a promise, so we need to await it to get the hash
          password: await authentication(salt, password), //the password is stored in the database as a hash
        },
      });

      return res.status(200).json(user).end(); //returns the user object
    } catch (error) {
      log.info(`Error: ${error}`); //logs the error
      return res.sendStatus(400);
    }
  },
);
