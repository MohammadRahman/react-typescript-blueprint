import { emailAccountApi } from "@apis/email-account";
import { showToast } from "@components/toast/Toast";
import { useEmailData } from "@context/EmailAccountContext";
import { useErrorHandler } from "@hooks/useErrorHandler";
import { ErrorResponse, PaginationPayload, PaginationResponse } from "@interface/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * Custom hook for managing email Account.
 */
export function useEmailAccount() {
  const { setEmailData } = useEmailData();
  const { errorState, showErrorWithDelay } = useErrorHandler();
  const queryClient = useQueryClient();

  const { mutate: emailLists, isPending: isLoading } = useMutation<
    PaginationResponse,
    AxiosError<ErrorResponse>,
    PaginationPayload
  >({
    mutationKey: ["EmailAccount"],
    mutationFn: async (data: PaginationPayload, options?: { signal?: AbortSignal }) => {
      const response = await emailAccountApi.getEmailLists(data, options?.signal);
      return response.data;
    },
    onMutate: () => {
      setEmailData(prevState => ({
        ...prevState!,
        isLoading: true,
      }));
    },
    onSuccess: data => {
      setEmailData({
        list: data.list,
        totalCount: data.pageCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ["EmailAccount"] });
      if (data && data.list.length === 0) {
        showToast({ message: "Nothing found", type: "warning" });
      }
    },
    onError: error => {
      setEmailData(prevState => ({
        ...prevState!,
        isLoading: false,
      }));
      showErrorWithDelay(error.message);
    },
  });
  return { emailLists, errorState, isLoading };
}
// export function useEmailAccount() {
//   const { setEmailData } = useEmailData();
//   const { errorState, showErrorWithDelay } = useErrorHandler();
//   const queryClient = useQueryClient();
//   const abortControllerRef = React.useRef<AbortController | null>(null);
//   const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

//   const { mutate: emailLists, isPending: isLoading } = useMutation({
//     mutationKey: ["EmailAccount"],
//     mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
//       try {
//         const response = await emailAccountApi.getEmailLists(data, options?.signal);
//         return response.data;
//       } catch (error: AxiosError | any) {
//         if (isCancel(error)) {
//           console.log("Request canceled:", error.message);
//         } else {
//           showErrorWithDelay();
//           showToast({ message: error.message, statusCode: 400, type: "error" });
//         }
//         throw error;
//       }
//     },
//     onMutate: () => {
//       setEmailData(prevState => ({
//         ...prevState!,
//         isLoading: true,
//       }));
//     },
//     onSuccess: data => {
//       setEmailData({
//         list: data.list,
//         totalCount: data.totalCount,
//         isLoading: false,
//         currentPage: data.currentPage || 1,
//       });
//       queryClient.invalidateQueries({ queryKey: ["EmailAccount"] });
//       if (data && data.list.length === 0) {
//         toast.success("Nothing found");
//       }
//     },
//     onError: () => {
//       setEmailData(prevState => ({
//         ...prevState!,
//         isLoading: false,
//       }));
//     },
//   });

//   const fetchWithSignal = (data: any) => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     abortControllerRef.current = new AbortController();
//     const signal = abortControllerRef.current.signal;

//     if (timeoutIdRef.current) {
//       clearTimeout(timeoutIdRef.current);
//     }

//     timeoutIdRef.current = setTimeout(() => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//         setEmailData(prevState => ({
//           ...prevState!,
//           isLoading: false,
//         }));
//       }
//     }, 30000);

//     try {
//       return emailLists({ ...data, signal });
//     } catch (error) {
//       throw error;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       if (timeoutIdRef.current) {
//         clearTimeout(timeoutIdRef.current);
//       }
//     };
//   }, []);

//   return { emailLists: fetchWithSignal, errorState, isLoading };
// }
