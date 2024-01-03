import axios_, { AxiosInstance } from "axios";
import { BASE_URL } from "@/constants";

let axios: AxiosInstance;

if (typeof window !== "undefined") {
  // Check if the code is running on the client-side (the browser)
  const authToken = localStorage.getItem("authToken");

  axios = axios_.create({
    baseURL: BASE_URL,
    headers: {
      authtoken: authToken ? authToken : "",
    },
  });

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.error(`Error with request: ${error}`);
      return Promise.reject(error);
    },
  );
} else {
  // If the code is running on the server-side, create a basic axios_ instance without headers
  axios = axios_.create({
    baseURL: BASE_URL,
  });
}

export default axios;
