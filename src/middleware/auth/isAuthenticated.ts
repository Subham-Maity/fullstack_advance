import express from "express";
import { merge } from "lodash";
import { getUserBySessionToken } from "../../model/users/users";
import log from "../../utils/logger/logger";
import { session_Token } from "../../../config/default";

//We will use this middleware to check if the user is authenticated or not before accessing the protected routes
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    //This is the session token stored in the cookie
    const sessionToken = req.cookies[session_Token];

    //If the session token is missing, it will return a 403 status code
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    //It will fetch the user from the database by session token
    const existingUser = await getUserBySessionToken(sessionToken);

    //If the user doesn't exist, it will return a 403 status code
    if (!existingUser) {
      return res.sendStatus(403);
    }

    //It will set the user in the request object and pass it to the next middleware
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    log.info(`Error: ${error}`);
    return res.sendStatus(400);
  }
};
