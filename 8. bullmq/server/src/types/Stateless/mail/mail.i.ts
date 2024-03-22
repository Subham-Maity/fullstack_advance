export interface MailRequest {
  username: string;
  userEmail: string;
  text: string;
  subject: string;
}

export interface EmailData {
  item: string;
  description: string;
  price: string;
}
export interface Button {
  color: string;
  text: string;
  link: string;
}

export interface Action {
  instructions: string;
  button: Button;
}

export interface EmailBody {
  name: string;
  intro: string;
  table: {
    data: EmailData[];
  };
  action: Action[];
  outro: string;
  signature?: string;
}

export interface Email {
  body: EmailBody;
}
