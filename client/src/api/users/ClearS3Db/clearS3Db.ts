import axios from "@/hooks/axios";

// Function to trigger the database clearing API
export async function clearDatabaseApi() {
  try {
    const response = await axios.post(
      `/api/v2/storage-v1/s3/clear-database-s3`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error clearing database: ${error}`);
    throw error;
  }
}
