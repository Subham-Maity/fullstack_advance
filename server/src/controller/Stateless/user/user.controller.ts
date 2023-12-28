import * as express from "express";
import catchAsyncError from "../../../middleware/error/catchAsyncError";

/** Get User */

/** GET: http://localhost:5050/api/v2/user/example123 */

export const getUser = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "getUser" });
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
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "updateUser" });
  },
);
