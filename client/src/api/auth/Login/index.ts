import { IUser2Fields } from "@/types/user/user.i";
import axios from "@/hooks/axios";

/** login function */
export async function verifyPassword({ username, password }: IUser2Fields) {
  try {
    if (username) {
      const response = await axios.post("/api/v2/auth/login", {
        username,
        password,
      });
      return response.data;
    }
  } catch (error) {
    console.error(`Error verifying password: ${error}`);
    throw error;
  }
}
