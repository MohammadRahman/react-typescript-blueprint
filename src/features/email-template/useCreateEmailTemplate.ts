import { templateApi } from "@apis/email-template";
import { useTemplateData } from "@context/TemplateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateEmailTemplate() {
  const queryClient = useQueryClient();
  const { setTemplateData } = useTemplateData();

  const { mutate: createTemplate, isPending: isCreating } = useMutation({
    mutationKey: ["Template"],
    mutationFn: async (data: any) => {
      console.log("data received in hook", data);
      try {
        const response = await templateApi.createNewTemplate(data);
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
      setTemplateData(prev => {
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
      queryClient.invalidateQueries({ queryKey: ["Template"] });
      toast.success("Template created.");
    },
    onError: error => {
      toast.error(error.message);
    },
  });
  return { createTemplate, isCreating };
}
