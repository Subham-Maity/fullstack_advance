import { IUser2Fields } from "@/types/user/user.i";
import axios from "@/hooks/axios";
import { getUser } from "@/api/users/GetUser";
import { sendEmail } from "@/api/mail";

/** login function */
export async function verifyPassword({ username, password }: IUser2Fields) {
  try {
    if (username) {
      const response = await axios.post("/api/v2/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Get user's email
        let {
          data: { email },
        } = await getUser(username);

        // Send login notification email
        let text = `You have successfully logged in.`;
        await sendEmail(username, email, text, "Login Notification");
      }

      return response.data;
    }
  } catch (error) {
    console.error(`Error verifying password: ${error}`);
    throw error;
  }
}
