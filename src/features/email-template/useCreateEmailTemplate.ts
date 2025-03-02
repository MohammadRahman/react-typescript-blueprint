import { templateApi } from "@apis/email-template";
import { showToast } from "@components/toast/Toast";
import { useTemplateData } from "@context/TemplateContext";
import { ErrorResponse } from "@interface/common";
import { CreateTemplatePayload, TemplatePayload } from "@interface/email";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateEmailTemplate() {
  const queryClient = useQueryClient();
  const { setTemplateData } = useTemplateData();

  const { mutate: createTemplate, isPending: isCreating } = useMutation<
    TemplatePayload,
    AxiosError<ErrorResponse>,
    CreateTemplatePayload
  >({
    mutationKey: ["Templates"],
    mutationFn: async (data: CreateTemplatePayload) => {
      const response = await templateApi.createNewTemplate(data);
      return response.data;
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
      showToast({ message: "template created.", statusCode: 201, type: "success" });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorDetails = {
        title: "Error",
        message: "An unknown error occurred",
        statusCode: error.response?.status || 500,
      };
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        errorDetails.message = errorMessages.join(", ");
      } else if (error.message) {
        errorDetails.message = error.message;
      }
      showToast({
        message: errorDetails.message,
        statusCode: errorDetails.statusCode,
        type: "error",
      });
    },
  });
  return { createTemplate, isCreating };
}
