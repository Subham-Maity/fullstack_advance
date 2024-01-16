import express, { Router } from "express";

import authentication from "./auth/auth.router";
import users from "./user/user.router";

const router: Router = express.Router();

export default {
  authentication,
  users,
  router,
};
