import { templateApi } from "@apis/email-template";
import { showToast } from "@components/toast/Toast";
import { useTemplateData } from "@context/TemplateContext";
import { useErrorHandler } from "@hooks/useErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isCancel } from "axios";
import React, { useEffect } from "react";

export function useEmailTemplate() {
  const { setTemplateData } = useTemplateData();
  const { errorState, showErrorWithDelay } = useErrorHandler();
  const queryClient = useQueryClient();
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const { mutate: templateLists, isPending: isLoading } = useMutation({
    mutationKey: ["Templates"],
    mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
      try {
        const response = await templateApi.getTemplateLists(data, options?.signal);
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
      setTemplateData(prevState => ({
        ...prevState!,
        isLoading: true,
      }));
    },
    onSuccess: data => {
      setTemplateData({
        list: data.list,
        totalCount: data.totalCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ["Query"] });
      if (data && data.list.length === 0) {
        showToast({ message: "Nothing found", type: "warning" });
        // toast.success("Nothing found");
      }
    },
    onError: () => {
      setTemplateData(prevState => ({
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
        setTemplateData(prevState => ({
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

  return { templateLists: fetchWithSignal, errorState, isLoading };
}
