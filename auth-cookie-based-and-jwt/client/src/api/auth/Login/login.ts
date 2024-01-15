import { IUser2Fields } from "@/types/api/user/user.i";
import axios from "@/hooks/axios";
import { sendEmail } from "@/api/mail/mail";

/** login function */

export async function verifyPassword({ username, password }: IUser2Fields) {
  try {
    if (username) {
      const { data } = await axios.post("/api/v2/auth/login", {
        username,
        password,
      });

      // If login is successful, send an email
      if (data.msg === "Login Successful...!") {
        await sendEmail(
          data.username,
          data.email,
          data.msg,
          "Login Confirmation",
        );
      }

      return Promise.resolve({ data });
    }
  } catch (error) {
    console.error(`Error verifying password: ${error}`);
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}
