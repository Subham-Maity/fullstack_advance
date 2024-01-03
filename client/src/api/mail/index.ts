import axios from "@/hooks/axios";
import { GMAIL_0AUTH } from "@/constants";

/** Send email */

export async function sendEmail(
  username: string,
  email: string,
  text: string,
  subject: string,
) {
  try {
    await axios.post(GMAIL_0AUTH, {
      username,
      userEmail: email,
      text,
      subject,
    });
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw error;
  }
}
