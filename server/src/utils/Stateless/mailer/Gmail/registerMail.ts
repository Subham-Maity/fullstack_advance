// registerMail.ts
import * as express from "express";
import { MailRequest } from "../../../../types/Stateless/mail/mail.i";
import { createEmailBody, generateEmailBody, sendMail } from "./mailer";
import { body as emailBodyConfig, GMAIL_EMAIL } from "../mailerConfig";

export const registerGMail = async (
  req: express.Request,
  res: express.Response,
) => {
  const { username, userEmail, text, subject }: MailRequest = req.body;

  const email = createEmailBody(username, text, { body: emailBodyConfig });

  const generatedEmailBody = generateEmailBody(email);

  const message = {
    from: GMAIL_EMAIL,
    to: userEmail,
    subject: subject || "Signup Successful",
    html: generatedEmailBody,
  };

  sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};
