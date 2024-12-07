import { CreateEmailAccountPayload, emailAccountApi } from "@apis/email-account";
import { useEmailData } from "@context/EmailAccountContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateEmailAccount() {
  const queryClient = useQueryClient();
  const { setEmailData } = useEmailData();

  const { mutate: createEmailAccount, isPending: isCreating } = useMutation({
    mutationKey: ["Source"],
    mutationFn: async (data: CreateEmailAccountPayload) => {
      try {
        const response = await emailAccountApi.createEmailAccount(data);
        return response.data;
      } catch (error: AxiosError | any) {
        const errorDetails = {
          title: "Error",
          message: "An unknown error occurred",
          statusCode: error.response?.status || 500,
        };

        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat();
          errorDetails.message = errorMessages.join(", ");
        } else if (error.message) {
          errorDetails.message = error.message;
        }
        toast.error(`${errorDetails.title} 🚨,\n${errorDetails.message}`);
        throw error;
      }
    },
    onSuccess: data => {
      setEmailData(prev => {
        if (!prev) {
          return {
            list: [data],
            totalCount: 1,
            isLoading: false,
            currentPage: 1,
          };
        }
        return {
          ...prev,
          list: [...prev.list, data],
          totalCount: prev.totalCount + 1,
        };
      });
      queryClient.invalidateQueries({ queryKey: ["Source"] });
      toast.success("source created.");
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { createEmailAccount, isCreating };
}
