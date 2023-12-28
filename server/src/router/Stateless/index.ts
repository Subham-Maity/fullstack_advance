import * as express from "express";
import { Router } from "express";

import authentication from "./auth/auth.router";
import users from "./user/user.router";
import mail from "./mail/mail.router";

const router: Router = express.Router();

export default {
  authentication,
  users,
  mail,
  router,
};
