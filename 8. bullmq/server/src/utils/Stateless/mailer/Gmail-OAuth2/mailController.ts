// mailController.ts
import MailService from "./MailService";

import { Worker } from "bullmq";

const emailQueue = new Worker(
  "email-queue",
  async (job) => {
    const { email, emailBody } = job.data;
    const jobID = job.id;
    console.log(`Processing job ${jobID}`);
    try {
      await MailService.sendMail(email, "Welcome!", emailBody);
      console.log(`Email sent for job ${jobID}`);
    } catch (error) {
      console.error(`Failed to send email for job ${jobID}: ${error}`);
    }
  },
  {
    connection: {
      host: "",
      port: 20702,
      username: "",
      password: "",
    },
    concurrency: 10,
    limiter: {
      max: 50,
      duration: 10 * 1000,
    },
  },
);
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
