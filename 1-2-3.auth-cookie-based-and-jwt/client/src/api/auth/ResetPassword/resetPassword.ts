import axios from "@/hooks/axios";
import { getUser } from "@/api/users/GetUser/getUser";
import { sendEmail } from "@/api/mail/mail";
import { IUser2Fields } from "@/types/api/user/user.i";

/** reset password */
export async function resetPassword({ username, password }: IUser2Fields) {
  try {
    const userResponse = await getUser(username);
    console.log("User Response:", userResponse);
    const { data, status } = await axios.put("/api/v2/auth/resetPassword", {
      username,
      password,
    });

    if (status === 200) {
      // Get user's email
      let {
        data: { email },
      } = userResponse;

      // Send password reset confirmation email
      let text = `Your password has been successfully reset.`;
      await sendEmail(username, email, text, "Password Reset Confirmation");
    }

    return { data, status };
  } catch (error) {
    console.error(`Error resetting password: ${error}`);
    throw error;
  }
}
