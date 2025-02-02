import { sourceApi } from "@apis/source/source";
import { useSourceData } from "@context/SourceContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isCancel } from "axios";
import React from "react";
import toast from "react-hot-toast";

export function useSourceLists() {
  const { setSourceData } = useSourceData();
  const queryClient = useQueryClient();
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const { mutate: sourceLists, isPending: isLoading } = useMutation({
    mutationKey: ["Source"],
    mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
      try {
        const response = await sourceApi.getSourceLists(data, options?.signal);
        return response.data;
      } catch (error: AxiosError | any) {
        if (isCancel(error)) {
          toast.error(error.message || "");
        } else {
          toast.error(error.message);
        }
      }
    },
    onMutate: () => {
      setSourceData(prevState => ({
        ...prevState!,
        isLoading: true,
      }));
    },
    onSuccess: data => {
      setSourceData({
        list: data.list,
        totalCount: data.totalCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ["EmailAccount"] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const fetchWithSignal = (data: any) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const signal = abortControllerRef.current.signal;
    return sourceLists({ ...data, signal });
  };

  return { sourceLists: fetchWithSignal, isLoading };
}
