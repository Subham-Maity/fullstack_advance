// Importing the necessary modules
import React from "react";
import { useEffect, useState } from "react";
import { getUsername } from "@/api/users/GetUsername/getUsername";
import axios from "@/hooks/axios";

// Setting the default base URL for axios

// Define the shape of the data state
interface DataState {
  isLoading: boolean;
  apiData?: any;
  status?: number | null;
  serverError?: any;
}

// Custom hook for fetching data
export default function useFetch(
  query: string | null,
): [DataState, React.Dispatch<React.SetStateAction<DataState>>] {
  // Initialize state
  const [getData, setData] = useState<DataState>({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        // Set loading state to true
        setData((prev) => ({ ...prev, isLoading: true }));

        // Get the username if no query is provided
        const { username } = !query ? await getUsername() : "";

        // Fetch data from the API
        const response = !query
          ? await axios.get(`/api/v2/user/${username}`)
          : await axios.get(`/api/v2/${query}`);

        // If the status is 201, update the state with the received data
        if (response.status === 200) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: response.data,
            status: response.status,
          }));
        }

        // Set loading state to false
        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        // Handle error by updating the state
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    // Call the fetchData function
    fetchData().then((r) => r);
  }, [query]); // Re-run the effect when the 'query' changes

  // Return the state and the state updater function
  return [getData, setData];
}
