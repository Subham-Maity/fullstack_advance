import axios_ from "axios";
import { BASE_URL } from "@/constants";

let axios: any;

if (typeof window !== "undefined") {
  // Check if the code is running on the client-side (the browser)
  const authToken = localStorage.getItem("authToken");

  axios = axios_.create({
    baseURL: BASE_URL,
    headers: {
      authtoken: authToken ? authToken : "",
    },
  });
} else {
  // If the code is running on the server-side, create a basic axios_ instance without headers
  axios = axios_.create({
    baseURL: BASE_URL,
  });
}

export default axios;
