import * as express from "express";
import { Router } from "express";
import { registerMail } from "../../../utils/Stateless/mailer/Email/mailer";
import { registerGMail } from "../../../utils/Stateless/mailer/Gmail-SMTP/registerMail";
import MailController from "../../../utils/Stateless/mailer/Gmail-OAuth2/mailController";

const mail: Router = express.Router();

mail
  .post("/registerMail", registerMail)
  .post("/registerGMail", registerGMail)
  //If you want to use 0Auth2.0,
  // please comment this line and first set up all tokens and credentials in the mailConfig.ts file
  .post("/registerGMail0Auth", MailController.sendMail);

export default mail;
