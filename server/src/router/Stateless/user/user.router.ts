import * as express from "express";
import { Router } from "express";

import {
  getUser,
  updateUser,
} from "../../../controller/Stateless/user/user.controller";
import { isAuthenticated } from "../../../middleware/Stateless/auth/isAuthenticated";
import { isOwner } from "../../../middleware/Stateless/auth/isOwner";

const users: Router = express.Router();

users
  .get("/user/:username", getUser)
  .put("/updateuser", isAuthenticated, isOwner, updateUser);

export default users;
