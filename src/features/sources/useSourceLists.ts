import { sourceApi } from "@apis/source/source";
import { showToast } from "@components/toast";
import { useSourceData } from "@context/SourceContext";
import { useErrorHandler } from "@hooks/useErrorHandler";
import { ErrorResponse, PaginationPayload, PaginationResponse } from "@interface/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/**
 * Custom hook for managing source.
 */
export function useSource() {
  const { setSourceData } = useSourceData();
  const { errorState, showErrorWithDelay } = useErrorHandler();
  const queryClient = useQueryClient();
  const { mutate: sourceLists, isPending: isLoading } = useMutation<
    PaginationResponse,
    AxiosError<ErrorResponse>,
    PaginationPayload
  >({
    mutationKey: ["Source"],
    mutationFn: async (data: PaginationPayload, options?: { signla?: AbortSignal }) => {
      const response = await sourceApi.getSourceLists(data, options?.signla);
      return response.data;
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
        totalCount: data.pageCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ["Source"] });
      if (data && data.list.length === 0) {
        showToast({ message: "Nothing found", type: "warning" });
      }
    },
    onError: error => {
      setSourceData(prevState => ({
        ...prevState!,
        isLoading: false,
      }));
      showErrorWithDelay(error.message);
    },
  });
  return { sourceLists, isLoading, errorState };
}
// export function useSourceLists() {
//   const { setSourceData } = useSourceData();
//     const queryClient = useQueryClient();

//   const abortControllerRef = React.useRef<AbortController | null>(null);

//   const { mutate: sourceLists, isPending: isLoading } = useMutation({
//     mutationKey: ["Source"],
//     mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
//       try {
//         const response = await sourceApi.getSourceLists(data, options?.signal);
//         console.log("data received in source hook", data);
//         return response.data;
//       } catch (error: AxiosError | any) {
//         if (isCancel(error)) {
//           toast.error(error.message || "");
//         } else {
//           toast.error(error.message);
//         }
//       }
//     },
//     onMutate: () => {
//       setSourceData(prevState => ({
//         ...prevState!,
//         isLoading: true,
//       }));
//     },
//     onSuccess: data => {
//       setSourceData({
//         list: data.list,
//         totalCount: data.totalCount,
//         isLoading: false,
//         currentPage: data.currentPage || 1,
//       });
//       queryClient.invalidateQueries({ queryKey: ["EmailAccount"] });
//     },
//     onError: error => {
//       toast.error(error.message);
//     },
//   });

//   const fetchWithSignal = (data: any) => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     abortControllerRef.current = new AbortController();

//     const signal = abortControllerRef.current.signal;
//     return sourceLists({ ...data, signal });
//   };

//   return { sourceLists: fetchWithSignal, isLoading };
// }
