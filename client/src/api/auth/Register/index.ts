import axios from "@/hooks/axios";
import { IUser2Fields } from "@/types/user/user.i";

/** Register user */
async function register(credentials: IUser2Fields) {
  try {
    const response = await axios.post(`/api/v2/auth/register`, credentials);
    return { msg: response.data.msg, status: response.status };
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    throw error;
  }
}

/** Send registration email */
const GMAIL_SMTP = "/api/v2/mail-v1/registerGMail";
const GMAIL_0AUTH = "/api/v2/mail-v1/registerGMail0Auth";
const normal_EMAIL = "/api/v2/mail-v1/registerMail";
async function sendRegistrationEmail(
  username: string,
  email: string,
  msg: string,
) {
  try {
    await axios.post(GMAIL_0AUTH, {
      username,
      userEmail: email,
      text: msg,
    });
  } catch (error) {
    console.error(`Error sending registration email: ${error}`);
    throw error;
  }
}
/** Register user and send email if registration is successful */
export async function registerUser(credentials: IUser2Fields) {
  try {
    const { msg, status } = await register(credentials);

    if (status === 201) {
      await sendRegistrationEmail(credentials.username, credentials.email, msg);
    }

    return Promise.resolve(msg);
  } catch (error) {
    console.error(`Error in registerUser: ${error}`);
    return Promise.reject({ error });
  }
}
