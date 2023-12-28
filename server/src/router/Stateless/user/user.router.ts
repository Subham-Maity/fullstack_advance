import * as express from "express";
import { Router } from "express";

import {
  getUser,
  updateUser,
} from "../../../controller/Stateless/user/user.controller";

const users: Router = express.Router();

users.get("/user/:username", getUser).put("/updateuser", updateUser);

export default users;
