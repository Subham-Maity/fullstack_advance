import jwt_decode from "jwt-decode";

export async function getUsername() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Cannot find Token");
  }

  try {
    // @ts-ignore
    return jwt_decode(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    throw error;
  }
}
