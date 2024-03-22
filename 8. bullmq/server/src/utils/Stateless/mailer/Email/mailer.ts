import * as express from "express";
import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { MailRequest } from "../../../../types/Stateless/mail/mail.i";
import { EMAIL, PASSWORD } from "../mailerConfig";
//*****************MAILER*****************//
// https://ethereal.email/create
//https://nodemailer.com/#example
//It will get this from their website
const nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodeConfig);

//Initialize Mailgen with your theme
// is a Node.js package that generates clean, responsive HTML e-mails for sending transactional mail.
const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

/** POST: http://localhost:5050/api/v2/mail-v1/registerMail
 "username" : "example123",
 "userEmail" : "admin123",
 "text" : "",
 "subject" : "",
 }
 * @param req
 * @param res
 */
export const registerMail = async (
  req: express.Request,
  res: express.Response,
) => {
  const { username, userEmail, text, subject }: MailRequest = req.body;

  // body of the email
  const email = {
    body: {
      name: username,
      intro:
        text || "Welcome to CodeXam! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  // Generate an HTML email with the provided contents

  const emailBody = MailGenerator.generate(email);

  // setup email data with unicode symbols and html body
  const message = {
    from: process.env.EMAIL, // sender address (who sends)
    to: userEmail, // list of receivers (who receives) - comma separated
    subject: subject || "Signup Successful", // Subject line
    html: emailBody, // html body
  };

  // send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
