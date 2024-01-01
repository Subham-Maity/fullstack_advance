// successfully redirect user when OTP is valid
import catchAsyncError from "../../../middleware/error/catchAsyncError";
import * as express from "express";

/** GET: http://localhost:5050/api/v2/auth/resetSession
 * @param : {
 * "resetSession": true,
 * }
 */
export const createResetSession = catchAsyncError(
  async (req: express.Request, res: express.Response) => {
    try {
      // Set the resetSession flag to true in the app.locals object and send the response to the client
      if (req.app.locals.resetSession) {
        return res.status(201).json({ resetSessionFlag: true });
      } else {
        return res.status(440).json({ error: "Session expired!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
