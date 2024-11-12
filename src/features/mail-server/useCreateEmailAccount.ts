import { CreateEmailAccountPayload, emailAccountApi } from "@apis/email-account/email";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateEmailAccount(){

    const queryClient = useQueryClient();
    
    const {mutate: createEmailAccount, isPending: isLoading} = useMutation({
        mutationKey: ['emailAccount'],
        mutationFn: async(data: CreateEmailAccountPayload)=>{
            try {
                const response = await emailAccountApi.createEmailAccount(data);
                console.log("form received with fields in hook.", data)
                return response.data;
            } catch (error) {
                console.log(error)
            }
           
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('New user created successfully.');
        },
        onError: (error)=> {console.log(error)}
    })
    return {createEmailAccount, isLoading}
}