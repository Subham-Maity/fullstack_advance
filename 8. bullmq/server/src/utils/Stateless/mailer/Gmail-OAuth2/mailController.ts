// mailController.ts
import { Request, Response } from "express";
import MailService from "./MailService";

class MailController {
  async sendMail(userEmail: string, subject: string, emailBody: any) {
    try {
      await MailService.sendMail(userEmail, subject, emailBody);
      return { msg: "You should receive an email from us." };
    } catch (error) {
      return { error };
    }
  }
}

export default new MailController();
