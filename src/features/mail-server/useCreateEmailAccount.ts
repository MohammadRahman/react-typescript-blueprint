import { CreateEmailAccountPayload, emailAccountApi } from "@apis/email-account/email";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useCreateEmailAccount(){

    const queryClient = useQueryClient();
    
    const {mutate: createEmailAccount, isPending: isCreating} = useMutation({
        mutationKey: ['emailAccount'],
        mutationFn: async(data: CreateEmailAccountPayload)=>{
            try {
                const response = await emailAccountApi.createEmailAccount(data);
                console.log("filter data",response.data);
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
            queryClient.invalidateQueries({ queryKey: ['EmailAccount'] });
            toast.success("email account created.")
        },
        onError: (error)=> {toast.error(error.message)}
    })
    return {createEmailAccount, isCreating}
}