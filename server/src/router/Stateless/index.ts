import * as express from "express";
import { Router } from "express";

import authentication from "./auth/auth.router";
import users from "./user/user.router";
import mail from "./mail/mail.router";
import token from "./token/token.router";
import otp from "./auth/otp.router";
import s3 from "./s3/s3.router";

const router: Router = express.Router();

export default {
  authentication,
  otp,
  users,
  mail,
  token,
  s3,
  router,
};
