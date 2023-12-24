import express, { Router } from "express";
import { login, register } from "../../controller/auth/auth.controller";

const auth: Router = express.Router();

auth.post("/register", register).post("/login", login);

export default auth;
