import { queryApi } from "@apis/query";
import { usequeryData } from "@context/QueryContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isCancel } from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export function useQueryData() {
  const { setQueryData } = usequeryData();

  const queryClient = useQueryClient();
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const { mutate: queryLists, isPending: isLoading } = useMutation({
    mutationKey: ["QueryData"],
    mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
      try {
        const response = await queryApi.getQueryLists(data, options?.signal);
        return response.data;
      } catch (error: AxiosError | any) {
        if (isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error:", error.message);
          toast.error(error.message);
        }
        throw error; // Ensure errors bubble up
      }
    },
    onMutate: () => {
      setQueryData(prevState => ({
        ...prevState!,
        isLoading: true,
      }));
    },
    onSuccess: data => {
      setQueryData({
        list: data.list,
        totalCount: data.totalCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ["QueryData"] });
      if (data && data.list.length === 0) {
        toast.success("Nothing found");
      }
    },
    onError: error => {
      setQueryData(prevState => ({
        ...prevState!,
        isLoading: false,
      }));
      toast.error(error.message);
    },
  });

  const fetchWithSignal = (data: any) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setQueryData(prevState => ({
          ...prevState!,
          isLoading: false,
        }));
      }
    }, 30000);

    try {
      return queryLists({ ...data, signal });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { queryLists: fetchWithSignal, isLoading };
}
