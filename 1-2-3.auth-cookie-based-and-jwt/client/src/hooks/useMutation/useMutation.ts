import { useState } from "react";
import { useToast } from "@/hooks/toast";
import axios from "@/hooks/axios";

const useMutation = ({ url, method = "POST" }: any) => {
  const toast = useToast();
  const [state, setState] = useState({
    isLoading: false,
    error: "",
  });

  const fn = async (data: any) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    axios({ url, method, data })
      .then(() => {
        setState({ isLoading: false, error: "" });

        toast.notifySuccess("Success");
      })
      .catch((error) => {
        setState({ isLoading: false, error: error.message });
      });
  };

  return { mutate: fn, ...state };
};

export default useMutation;
