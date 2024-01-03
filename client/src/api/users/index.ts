import axios from "@/hooks/axios";

/** get User details */
export async function getUser(username: string) {
  try {
    const { data } = await axios.get(`/api/v2/user/${username}`);
    return { data };
  } catch (error) {
    throw error;
  }
}
