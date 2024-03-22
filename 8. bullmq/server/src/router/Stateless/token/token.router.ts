import * as express from "express";
import { Router } from "express";
import {
  generateAccessTokenHandler,
  logoutHandler,
} from "../../../controller/Stateless/token/token.controller";

const token: Router = express.Router();

token.post("/", generateAccessTokenHandler).delete("/", logoutHandler);

export default token;
