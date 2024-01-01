import * as express from "express";
import { Router } from "express";
import {
  login,
  register,
  resetPassword,
} from "../../../controller/Stateless/auth/auth.controller";
import { verifyUser } from "../../../controller/Stateless/auth/verifyUser.controller";
import { createResetSession } from "../../../controller/Stateless/auth/session.controller";

const auth: Router = express.Router();

auth
  .post("/register", register)
  .post("/authenticate", verifyUser, (res: express.Response) => res.end()) //Authenticate the user
  .post("/login", verifyUser, login) //first verify the user then log-in the user
  .get("/createResetSession", createResetSession)
  .put("/resetPassword", verifyUser, resetPassword);

export default auth;
