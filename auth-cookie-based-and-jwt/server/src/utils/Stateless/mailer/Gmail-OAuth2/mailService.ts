// mailService.ts
import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { google } from "googleapis";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  productLink,
  productLogo,
  productName,
  REDIRECT_URI,
  REFRESH_TOKEN,
  TEXTOFSENDINGEMAIL,
  themeColor,
  ZeroAuth_Gmail_EMAIL,
} from "../mailerConfig";

//This will use it for 0Auth2.0 authentication
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

//refresh token for 0Auth2.0
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//📩 Nodemailer - Email Configuration
class MailService {
  private transporter: nodemailer.Transporter;
  private mailGenerator: Mailgen;

  //This constructor will initialize the transporter and mailGenerator object
  //constructor will be called when we create an instance of this class

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ZeroAuth_Gmail_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: oAuth2Client.getAccessToken(),
      },
    } as nodemailer.TransportOptions);

    this.mailGenerator = new Mailgen({
      theme: themeColor,
      product: {
        name: productName,
        link: productLink,
        logo: productLogo,
      },
    });
  }

  async sendMail(receiverEmail: string, subject: string, emailBody: any) {
    const email = this.mailGenerator.generate(emailBody);
    const message = {
      from: `${TEXTOFSENDINGEMAIL}" "<${ZeroAuth_Gmail_EMAIL}>`,
      to: receiverEmail,
      subject: subject,
      html: email,
    };

    return this.transporter.sendMail(message);
  }
}

export default new MailService();
