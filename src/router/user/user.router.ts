import express, { Router } from "express";
import { isAuthenticated } from "../../middleware/auth/isAuthenticated";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../controller/user/user.controller";
import { isOwner } from "../../middleware/auth/isOwner";

const auth: Router = express.Router();

auth
  .get("/users", isAuthenticated, getAllUsers)
  .delete("/users/:id", isAuthenticated, isOwner, deleteUser)
  .patch("/users/:id", isAuthenticated, isOwner, updateUser);
export default auth;
