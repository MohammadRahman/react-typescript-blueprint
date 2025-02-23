import { jobService } from "@apis/job";
import { showToast } from "@components/toast/Toast";
import { useJobData } from "@context/JobContext";
import { useErrorHandler } from "@hooks/useErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isCancel } from "axios";
import React, { useEffect } from "react";

export function useJobsList() {
  const { setJobData } = useJobData();
  const { errorState, showErrorWithDelay } = useErrorHandler();
  const queryClient = useQueryClient();
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const { mutate: templateLists, isPending: isLoading } = useMutation({
    mutationKey: ["Jobs"],
    mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
      try {
        const response = await jobService.getJobLists(data, options?.signal);
        return response.data;
      } catch (error: AxiosError | any) {
        if (isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          showErrorWithDelay();
          showToast({ message: error.message, statusCode: 400, type: "error" });
        }
        throw error;
      }
    },
    onMutate: () => {
      setJobData(prevState => ({
        ...prevState!,
        isLoading: true,
      }));
    },
    onSuccess: data => {
      setJobData({
        list: data.list,
        totalCount: data.totalCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ["Job"] });
      if (data && data.list.length === 0) {
        showToast({ message: "Nothing found", type: "warning" });
        // toast.success("Nothing found");
      }
    },
    onError: () => {
      setJobData(prevState => ({
        ...prevState!,
        isLoading: false,
      }));
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
        setJobData(prevState => ({
          ...prevState!,
          isLoading: false,
        }));
      }
    }, 30000);

    try {
      return templateLists({ ...data, signal });
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

  return { jobLists: fetchWithSignal, errorState, isLoading };
}
