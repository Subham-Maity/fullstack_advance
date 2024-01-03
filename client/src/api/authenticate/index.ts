import axios from "@/hooks/axios";

/** authenticate function */
export async function authenticate(username: string) {
  try {
    return await axios.post("/api/v2/auth/authenticate", { username });
  } catch (error) {
    throw error;
  }
}
