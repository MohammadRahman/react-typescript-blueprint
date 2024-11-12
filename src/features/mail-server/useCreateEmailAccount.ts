import { CreateEmailAccountPayload, emailAccountApi } from "@apis/email-account/email";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateEmailAccount(){

    const queryClient = useQueryClient();
    
    const {mutate: createEmailAccount, isPending: isLoading} = useMutation({
        mutationKey: ['emailAccount'],
        mutationFn: async(data: CreateEmailAccountPayload)=>{
            const response = await emailAccountApi.createEmailAccount(data);
            console.log("form received with fields in hook.", data)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('New user created successfully.');
        }
    })
    return {createEmailAccount, isLoading}
}