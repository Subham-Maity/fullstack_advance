import * as express from "express";
import { Router } from "express";
import { registerMail } from "../../../utils/Stateless/mailer/Email/mailer";
import { registerGMail } from "../../../utils/Stateless/mailer/Gmail/registerMail";

const mail: Router = express.Router();

mail.post("/registerMail", registerMail).post("/registerGMail", registerGMail);

export default mail;
