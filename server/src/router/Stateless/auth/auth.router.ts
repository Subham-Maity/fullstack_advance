import * as express from "express";
import { Router } from "express";
import {
  createResetSession,
  generateOTP,
  login,
  register,
  resetPassword,
  verifyOTP,
} from "../../../controller/Stateless/auth/auth.controller";
import { verifyUser } from "../../../controller/Stateless/auth/verifyUser.controller";

const auth: Router = express.Router();

auth
  .post("/register", register)
  .post("/authenticate")
  .post("/login", verifyUser, login) //first verify the user then login the user
  .get("/generateOTP", generateOTP)
  .get("/verifyOTP", verifyOTP)
  .get("/createResetSession", createResetSession)
  .put("/resetPassword", resetPassword);

export default auth;
