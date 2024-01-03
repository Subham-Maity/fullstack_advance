//📩 Nodemailer - Email Configuration
import {
  Action,
  EmailBody,
  EmailData,
} from "../../../types/Stateless/mail/mail.i";

export const EMAIL: string = process.env.EMAIL || "abc@abc.com";
export const PASSWORD: string = process.env.PASSWORD || "password";

//Go to https://myaccount.google.com/security
//Enable 2-Step Verification
//Create App Password https://myaccount.google.com/apppasswords
export const GMAIL_EMAIL: string = process.env.EMAIL || "codexam@gmail.com";
export const GMAIL_PASSWORD: string =
  process.env.PASSWORD || "xxxx yyyy zzzz aaaa";

//🦄 MailGenerator - This will user for theme and product information
export const themeColor: string = "neopolitan"; //you can change this to any theme you like {default, neopolitan,cerberus}
export const productName: string = "CodeXam";
export const productLink: string = "https://yourproduct.link/";
export const productLogo: string =
  "https://avatars.githubusercontent.com/u/97989643?s=400&u=fd3f290540204c1453a440913f2150b581a33ec2&v=4";

//📩 Nodemailer - Email Configuration

export const name: string = "CodeXam";

//any data
export const data: EmailData[] = [
  {
    item: "Frontend",
    description: "React",
    price: "$10.99",
  },
];

//body of the email

export const action: Action = {
  instructions: "To get started with codeXam, please click here:",
  button: {
    color: "#22BC66", // Optional action button color
    text: "Confirm your account",
    link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
  },
};

export const body: EmailBody = {
  name: name,
  intro: "Welcome to CodeXam",
  table: {
    data: data,
  },
  action: [action],
  outro:
    "Need help, or have questions? Just reply to this email, we'd love to help.",
  signature: "CodeXam Team",
};

// _______________________________________________________________________________________________________________________
// _______________________________________________________________________________________________________________________

//0Auth2.0
export const CLIENT_ID: string =
  "0000000000-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com";
export const CLIENT_SECRET: string = "XXXXXXXXXXXXXXXXXXXXXXXXX";
export const REDIRECT_URI: string =
  "https://developers.google.com/oauthplayground";
export const REFRESH_TOKEN: string =
  "1//XYXYXYXYXYXYXYXYXYXYXYXYXYXYYXYXYXYXYXYYXYXYXYYXYXYXYYXYXYXYXYXYYXYX";
export const ZeroAuth_Gmail_EMAIL: string = "codexam.personal@gmail.com";

export const TEXTOFSENDINGEMAIL: string = "@CODEXAMOFFICIAL";
