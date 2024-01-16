// mailController.ts
import { Request, Response } from "express";
import MailService from "./MailService";

class MailController {
  async sendMail(req: Request, res: Response) {
    const { username, userEmail, text, subject } = req.body;

    const emailBody = {
      body: {
        name: username,
        intro: text || "Welcome to our community!",
      },
    };

    try {
      await MailService.sendMail(userEmail, subject, emailBody);
      res.status(200).send({ msg: "You should receive an email from us." });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}

export default new MailController();
