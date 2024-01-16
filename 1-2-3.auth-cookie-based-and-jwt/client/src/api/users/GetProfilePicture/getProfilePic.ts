import axios from "@/hooks/axios";

export async function getImageOwner(requestedImageName: any) {
  try {
    const response = await axios.post("/api/v2/storage-v1/s3/get-owner-image", {
      requestedImageName,
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting image owner: ${error}`);
    throw error;
  }
}
