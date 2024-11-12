import { CreateEmailAccountPayload, emailAccountApi } from "@apis/email-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateEmailAccount(){
    const queryClient = useQueryClient();

    const { mutate: updateEmailAccount, isPending: isLoading } = useMutation({
        mutationKey: ['emailAccount'],
        mutationFn: async ({id, data}: {id: string, data: CreateEmailAccountPayload})=> {
            const response = await emailAccountApi.upDateEmailAccount(id, data)
            return response.data;
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['emailAccount']})
        }
    })
    return {updateEmailAccount, isLoading}
}
