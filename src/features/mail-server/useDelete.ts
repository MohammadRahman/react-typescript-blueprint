import { emailAccountApi } from "@apis/email-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDelete() {
    const queryClient = useQueryClient()

    const {mutate: deleteAccount, isPending: isLoading} = useMutation({
        mutationFn: async (id: string)=> {
            const response = await emailAccountApi.deleteEmailAccount(id)
            return response.data;
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['emailAccount']})
        }

    })
    return {deleteAccount,isLoading}
}
