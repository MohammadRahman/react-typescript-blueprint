import { CreateSourceAccountPayload, sourceApi } from "@apis/source/source";
import { useSourceData } from "@context/SourceContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateSource(){

    const queryClient = useQueryClient();
    const {setSourceData} = useSourceData();

    const {mutate: createSource, isPending: isCreating} = useMutation({
        mutationKey: ['Source'],
        mutationFn: async(data: CreateSourceAccountPayload)=>{
            try {
                const response = await sourceApi.createSourceAccount(data);
                return response.data;
            } catch (error: AxiosError | any) {
                const errorDetails = { title: "Error", message: "An unknown error occurred", statusCode: error.response?.status || 500 };

                if (error.response && error.response.data && error.response.data.errors) {
                  const errorMessages = Object.values(error.response.data.errors).flat();
                  errorDetails.message = errorMessages.join(", ");
                } else if (error.message) {
                  errorDetails.message = error.message;
                }
                toast.error(`${errorDetails.title} 🚨,\n${errorDetails.message}`);
                throw error;
            }
           
        },
        onSuccess: (data) => {
            setSourceData((prev) => {
                if (!prev) {
                  return {
                    list: [data],
                    totalCount: 1,
                    isLoading: false,
                    currentPage: 1,
                  };
                }
                return {
                  ...prev,
                  list: [...prev.list, data],
                  totalCount: prev.totalCount + 1,
                };
              });
            queryClient.invalidateQueries({ queryKey: ['Source'] });
            toast.success("source created.")
        },
        onError: (error)=> {toast.error(error.message)}
    })
    return {createSource, isCreating}
}