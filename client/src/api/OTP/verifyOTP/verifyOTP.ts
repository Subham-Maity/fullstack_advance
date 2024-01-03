import axios from "@/hooks/axios";

/** verify OTP */
export async function verifyOTP({
  username,
  code,
}: {
  username: string;
  code: number;
}) {
  try {
    const { data, status } = await axios.get("/api/v2/auth/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    console.error(`Error verifying OTP: ${error}`);
    throw error;
  }
}
