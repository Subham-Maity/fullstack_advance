// mailer.ts
import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { Email } from "../../../../types/Stateless/mail/mail.i";
import {
  GMAIL_EMAIL,
  GMAIL_PASSWORD,
  productLink,
  productLogo,
  productName,
  themeColor,
} from "../mailerConfig";

const nodeConfig = {
  service: "gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodeConfig);

const MailGenerator = new Mailgen({
  theme: themeColor,
  product: {
    name: productName,
    link: productLink,
    logo: productLogo,
  },
});

export const sendMail = async (message: nodemailer.SendMailOptions) => {
  return transporter.sendMail(message);
};

export const generateEmailBody = (email: Email) => {
  return MailGenerator.generate(email);
};

export const createEmailBody = (
  username: string,
  text: string,
  body: Email,
): Email => {
  return {
    body: {
      ...body.body,
      name: username,
      intro: text || body.body.intro,
    },
  };
};
