import { jobService } from "@apis/job";
import { useJobData } from "@context/JobContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isCancel } from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export function useJobsList() {
  const { setJobData } = useJobData();

  const queryClient = useQueryClient();
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const { mutate: templateLists, isPending: isLoading } = useMutation({
    mutationKey: ["QueryData"],
    mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
      try {
        const response = await jobService.getJobLists(data, options?.signal);
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
      queryClient.invalidateQueries({ queryKey: ["QueryData"] });
      if (data && data.list.length === 0) {
        toast.success("Nothing found");
      }
    },
    onError: error => {
      setJobData(prevState => ({
        ...prevState!,
        isLoading: false,
      }));
      toast.error(error.message);
    },
  });

  const fetchWithSignal = (data: any) => {
    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Clear any existing timeout
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set a timeout to cancel the request after 30 seconds
    timeoutIdRef.current = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        // toast.error('Request timed out after 30 seconds');
        setJobData(prevState => ({
          ...prevState!,
          isLoading: false,
        }));
      }
    }, 30000); // 30 seconds

    try {
      return templateLists({ ...data, signal });
    } catch (error) {
      throw error; // Ensure errors bubble up
    }
  };

  // Cleanup on unmount
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

  return { jobLists: fetchWithSignal, isLoading };
}
