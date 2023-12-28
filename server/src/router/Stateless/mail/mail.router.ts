import * as express from "express";
import { Router } from "express";
import { registerMail } from "../../../utils/Stateless/mailer/mailer";

const mail: Router = express.Router();

mail.post("/registerMail", registerMail);

export default mail;
