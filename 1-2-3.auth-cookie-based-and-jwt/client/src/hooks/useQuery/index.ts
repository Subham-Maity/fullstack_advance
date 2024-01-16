import { useEffect, useState } from "react";
import axios from "@/hooks/axios";

const useQuery = (url: unknown, refetch: unknown) => {
  const [state, setState] = useState<any>({
    data: null,
    isLoading: true,
    error: "",
  });

  useEffect(() => {
    const fetch = async () => {
      if (typeof url === "string") {
        axios
          .get(url)
          .then(({ data }) => setState({ data, isLoading: false, error: "" }))
          .catch((error) =>
            setState({ data: null, isLoading: false, error: error.message }),
          );
      }
    };

    fetch();
  }, [url, refetch]);

  return state;
};

export default useQuery;
