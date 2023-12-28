import catchAsyncError from "../../../middleware/error/catchAsyncError";
import * as express from "express";
/** POST: http://localhost:5050/api/v1/auth/registerMail
 * @param: {
 "username" : "codexam_123",
 "userEmail" : "subham@codexam.com",
 "text" : "",
 "subject" : "",
 }
 */
export const registerMail = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    res.json({ message: "/mail/registerMail" });
  },
);
