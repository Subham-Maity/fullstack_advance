import * as express from "express";
import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../../controller/Stateful/user/user.controller";

const auth: Router = express.Router();

auth.get("/user/:username", getAllUsers).put("/updateuser", updateUser);

export default auth;
