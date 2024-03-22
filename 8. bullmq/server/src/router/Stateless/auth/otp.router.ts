import * as express from "express";
import { Router } from "express";
import {
  generateOTP,
  verifyOTP,
} from "../../../controller/Stateless/auth/otp.controller";
import { localVariables } from "../../../middleware/Stateless/auth/otp/localVariables";
import { verifyUser } from "../../../controller/Stateless/auth/verifyUser.controller";

const otp: Router = express.Router();

otp
  //first verify the user, then store the OTP in the app.locals object and then generate the OTP
  .get("/generateOTP", verifyUser, localVariables, generateOTP)
  .get("/verifyOTP", verifyUser, verifyOTP);

export default otp;
