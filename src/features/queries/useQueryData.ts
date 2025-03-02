import { queryApi } from "@apis/query";
import { showToast } from "@components/toast/Toast";
import { usequeryData } from "@context/QueryContext";
import { useErrorHandler } from "@hooks/useErrorHandler";
import { ErrorResponse, PaginationPayload, PaginationResponse } from "@interface/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useQueryData() {
  const { setQueryData } = usequeryData();
  const queryClient = useQueryClient();
  const { errorState, showErrorWithDelay } = useErrorHandler();

  const { mutate: queryLists, isPending: isLoading } = useMutation<
    PaginationResponse,
    AxiosError<ErrorResponse>,
    PaginationPayload
  >({
    mutationKey: ["Query"],
    mutationFn: async (data: PaginationPayload, options?: { signal?: AbortSignal }) => {
      const response = await queryApi.getQueryLists(data, options?.signal);
      return response.data;
    },
    onMutate: () => {
      setQueryData(prevData => ({
        ...prevData!,
        isLoading: true,
      }));
    },
    onSuccess: data => {
      setQueryData({
        list: data.list,
        totalCount: data.pageCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ["Templates"] });
      if (data && data.list.length === 0) {
        showToast({ message: "Nothing found", type: "warning" });
      }
    },
    onError: error => {
      setQueryData(prevState => ({
        ...prevState!,
        isLoading: false,
      }));
      showErrorWithDelay(error.message);
      showToast({ message: error.message, statusCode: 400, type: "error" });
    },
  });

  return { queryLists, errorState, isLoading };
}
