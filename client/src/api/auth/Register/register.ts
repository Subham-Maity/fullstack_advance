import axios from "@/hooks/axios";
import { IUser2Fields } from "@/types/user/user.i";
import { sendEmail } from "@/api/mail/mail";

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

/** Register user and send email if registration is successful */
export async function registerUser(credentials: IUser2Fields) {
  try {
    const { msg, status } = await register(credentials);

    if (status === 201) {
      await sendEmail(
        credentials.username,
        credentials.email,
        msg,
        "Registration Confirmation",
      );
    }

    return msg;
  } catch (error) {
    console.error(`Error in registerUser: ${error}`);
    throw error;
  }
}
