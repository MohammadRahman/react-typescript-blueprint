import { templateApi } from "@apis/email-template";
import { useTemplateData } from "@context/TemplateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, isCancel } from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export function useEmailTemplate() {

  const { setTemplateData } = useTemplateData();

  const queryClient = useQueryClient();
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);

  const { mutate: templateLists, isPending: isLoading } = useMutation({
    mutationKey: ['QueryData'],
    mutationFn: async (data: any, options?: { signal?: AbortSignal }) => {
      try {
        const response = await templateApi.getTemplateLists(data, options?.signal);
        return response.data;
      } catch (error: AxiosError | any) {
        if (isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error:', error.message);
          toast.error(error.message);
        }
        throw error; // Ensure errors bubble up
      }
    },
    onMutate: () => {
      setTemplateData((prevState) => ({
        ...prevState!,
        isLoading: true,
      }));
    },
    onSuccess: (data) => {
      setTemplateData({
        list: data.list,
        totalCount: data.totalCount,
        isLoading: false,
        currentPage: data.currentPage || 1,
      });
      queryClient.invalidateQueries({ queryKey: ['QueryData'] });
      if(data&&data.list.length ===0){
        toast.success('Nothing found');
      }else{
        toast.success("email account fetch successful.")
      }
    },
    onError: (error) => {
      setTemplateData((prevState) => ({
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
        setTemplateData((prevState) => ({
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

  return { templateLists: fetchWithSignal, isLoading };
}


// export function useQueryData(){
//     const { setTemplateData } = useEmailData();
//     const queryClient = useQueryClient();

//     const abortControllerRef = React.useRef<AbortController | null>(null);

//     const {mutate: templateLists, isPending: isLoading} = useMutation({
//         mutationKey: ['QueryData'],
//         mutationFn: async(data: any, options?: { signal?: AbortSignal })=>{
//             try {
//                 const response = await QueryDataApi.gettemplateLists(data, options?.signal);
//                 return response.data;
//             } catch (error: AxiosError | any) {
//             if (isCancel(error)) {
//                 console.log('Request canceled:', error.message);
//               } else {
//                 console.error('Error:', error.message);
//                 toast.error(error.message);
//               }
//             }           
//         },
//         onMutate: () => {
//             setTemplateData((prevState) => ({
//               ...prevState!,
//               isLoading: true,
//             }));
//           },
//         onSuccess: (data) => {
//             setTemplateData({
//                 list: data.list,
//                 totalCount: data.totalCount,
//                 isLoading: false,
//                 currentPage: data.currentPage || 1,
//               });
//             queryClient.invalidateQueries({ queryKey: ['QueryData'] });
//             toast.success('email lists successfully fetched.');
//         },
//         onError: (error)=> {
//             toast.error(error.message)
//         },
//     });
//     const fetchWithSignal = (data: any)=>{
//     if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       abortControllerRef.current = new AbortController();
  
//       const signal = abortControllerRef.current.signal;
//       try {
//         return templateLists({ ...data, signal });
//       } catch (error) {
//         throw error; // Ensure errors bubble up
//       }
//     }
//     return {templateLists:fetchWithSignal, isLoading}
// }