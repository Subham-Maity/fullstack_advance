import axios from "@/hooks/axios";
import { IUser2Fields } from "@/types/user/user.i";
import { sendEmail } from "@/api/mail";
import { getUser } from "@/api/users/GetUser";

/** Generate OTP */
async function generateOTP(username: IUser2Fields) {
  const {
    data: { code },
    status,
  } = await axios.get("/api/v2/auth/generateOTP", { params: { username } });
  return { code, status };
}

/** Generate OTP and send email if generation is successful */
export async function handleOTPGeneration(username: IUser2Fields) {
  try {
    const { code, status } = await generateOTP(username);

    if (status === 201) {
      let {
        data: { email },
      } = await getUser(username.username);
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await sendEmail(username.username, email, text, "Password Recovery OTP");
    }

    return code;
  } catch (error) {
    console.error(`Error handling OTP generation: ${error}`);
    throw error;
  }
}
