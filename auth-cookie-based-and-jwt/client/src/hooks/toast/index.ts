import { toast } from "react-hot-toast";

export const useToast = () => {
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const notifyInfo = (message: string) => toast.loading(message);

  return { notifySuccess, notifyError, notifyInfo };
};
