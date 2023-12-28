import * as express from "express";
import { Router } from "express";
import {
  createResetSession,
  generateOTP,
  login,
  register,
  resetPassword,
  verifyOTP,
  verifyUser,
} from "../../../controller/Stateless/auth/auth.controller";

const auth: Router = express.Router();

auth
  .post("/register", register)
  .post("/authenticate", verifyUser)
  .post("/login", login)
  .get("/generateOTP", generateOTP)
  .get("/verifyOTP", verifyOTP)
  .get("/createResetSession", createResetSession)
  .put("/resetPassword", resetPassword);

export default auth;
