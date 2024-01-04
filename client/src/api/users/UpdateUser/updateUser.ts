import axios from "@/hooks/axios";
import { IUser2Fields } from "@/types/api/user/user.i";

/** update user profile function */
export async function updateUser(response: IUser2Fields) {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put("/api/v2/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.error(`Error updating user profile: ${error}`);
    throw error;
  }
}
