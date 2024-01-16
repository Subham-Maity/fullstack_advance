import express, { Router } from "express";
import { isAuthenticated } from "../../../middleware/Stateful/auth/isAuthenticated";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../../controller/Stateful/user/user.controller";
import { isOwner } from "../../../middleware/Stateful/auth/isOwner";

const auth: Router = express.Router();

auth
  .get("/users", isAuthenticated, getAllUsers)
  .delete("/users/:id", isAuthenticated, isOwner, deleteUser)
  .patch("/users/:id", isAuthenticated, isOwner, updateUser);
export default auth;
