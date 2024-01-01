import { verifyJWT } from "../../../utils/Stateless/token/jwtVerify";
import * as express from "express";
import ENV from "../../../../config/default";
import AppError from "../../error/appError";
export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new AppError("No token present!", 401));
    }

    const decodedToken = (await verifyJWT(token, ENV.JWT_ACCESS_TOKEN)) as {
      userId: string;
    };

    const userId = req.query.id as string;

    if (!userId) {
      return next(new AppError("User Not Found", 401));
    }

    const currentUserId = decodedToken.userId;

    if (!currentUserId || currentUserId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!currentUserId || currentUserId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
