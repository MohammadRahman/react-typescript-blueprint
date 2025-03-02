import { sourceApi } from "@apis/source/source";
import { showToast } from "@components/toast";
import { useSourceData } from "@context/SourceContext";
import { ErrorResponse } from "@interface/common";
import { CreateSource, Source } from "@interface/source";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateSource() {
  const queryClient = useQueryClient();
  const { setSourceData } = useSourceData();

  const { mutate: createSource, isPending: isCreating } = useMutation<
    Source,
    AxiosError<ErrorResponse>,
    CreateSource
  >({
    mutationKey: ["Source"],
    mutationFn: async (data: CreateSource) => {
      const response = await sourceApi.createSourceAccount(data);
      return response.data;
    },
    onSuccess: data => {
      setSourceData(prev => {
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
      showToast({ message: "Source created.", statusCode: 201, type: "success" });
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
  return { createSource, isCreating };
}
