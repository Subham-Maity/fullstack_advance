import express from "express";
import { get } from "lodash";
import log from "../../../utils/logger/logger";

//Purpose: This middleware checks if the user is the owner of the resource
export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const { id } = req.params;

    //this is the id of the user that is logged in
    const currentUserId = get(req, "identity._id") as string | undefined;

    //if the user is not logged in, return a 400 status code
    if (!currentUserId) {
      return res.sendStatus(400);
    }

    //if the user is not the owner of the resource, return a 403 status code
    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    //if the user is the owner of the resource, call next()
    next();
  } catch (error) {
    log.info(`Error: ${error}`);
    return res.sendStatus(400);
  }
};
