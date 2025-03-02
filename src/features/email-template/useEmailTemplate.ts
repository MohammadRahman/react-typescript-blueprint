import { templateApi } from "@apis/email-template";
import { showToast } from "@components/toast/Toast";
import { useTemplateData } from "@context/TemplateContext";
import { useErrorHandler } from "@hooks/useErrorHandler";
import { ErrorResponse, PaginationPayload, PaginationResponse } from "@interface/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useCallback, useEffect } from "react";

/**
 * Custom hook for managing email templates.
 */
export function useEmailTemplate() {
  const { setTemplateData } = useTemplateData();
  const { errorState, showErrorWithDelay } = useErrorHandler();
  const queryClient = useQueryClient();
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  // Utility to clean up AbortController and timeout
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  const { mutate: templateLists, isPending: isLoading } = useMutation<
    PaginationResponse,
    AxiosError<ErrorResponse>,
    PaginationPayload
  >({
    mutationKey: ["Templates"],
    mutationFn: async (data: PaginationPayload, options?: { signal?: AbortSignal }) => {
      const response = await templateApi.getTemplateLists(data, options?.signal);
      return response.data;
    },
    onMutate: () => {
      setTemplateData(prevState => ({
        ...prevState!,
        isLoading: true,
      }));
    },
    onSuccess: data => {
      setTemplateData({
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
      setTemplateData(prevState => ({
        ...prevState!,
        isLoading: false,
      }));
      showErrorWithDelay(error.message);
    },
  });

  // Fetch with signal and timeout
  const fetchWithSignal = useCallback(
    (data: PaginationPayload) => {
      cleanup();

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      timeoutIdRef.current = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          setTemplateData(prevState => ({
            ...prevState!,
            isLoading: false,
          }));
          showToast({ message: "Request timed out", type: "error" });
        }
      }, 30000);

      try {
        return templateLists({ ...data, signal });
      } catch (error) {
        throw error;
      }
    },
    [cleanup, templateLists]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return { templateLists: fetchWithSignal, errorState, isLoading };
}
