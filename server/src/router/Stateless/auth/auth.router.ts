import * as express from "express";
import { Router } from "express";
import {
  login,
  register,
} from "../../../controller/Stateful/auth/auth.controller";

const auth: Router = express.Router();

auth
  .post("/register", register)
  .post("/registerMail", login)
  .post("/authenticate", login)
  .post("/login", login)
  .get("/generateOTP", login)
  .get("/verifyOTP", login)
  .get("/createResetSession", login)
  .put("/resetPassword", login);

export default auth;
