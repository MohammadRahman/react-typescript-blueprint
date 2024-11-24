import { CreateSourceAccountPayload, sourceApi } from "@apis/source/source";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateSource(){

    const queryClient = useQueryClient();
    
    const {mutate: createSource, isPending: isCreating} = useMutation({
        mutationKey: ['Source'],
        mutationFn: async(data: CreateSourceAccountPayload)=>{
            try {
                const response = await sourceApi.createSourceAccount(data);
                return response.data;
            } catch (error: AxiosError | any) {
                if (error.response && error.response.data && error.response.data.errors) {
                    const errorMessages = Object.values(error.response.data.errors)
                        .flat()
                        .join(', ');
                    toast.error(errorMessages);
                } else {
                    // Fallback for other errors
                    toast.error(error.message);
                }
                throw error;
            }
           
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Source'] });
            toast.success("source created.")
        },
        onError: (error)=> {toast.error(error.message)}
    })
    return {createSource, isCreating}
}