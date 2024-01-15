import axios from "@/hooks/axios";

/** get User details */
export async function getUser(username: string) {
  try {
    const response = await axios.get(`/api/v2/user/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting user details: ${error}`);
    throw error;
  }
}
