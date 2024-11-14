import { CreateEmailAccountPayload, emailAccountApi } from "@apis/email-account";
import { useEmailData } from "@context/EmailAccountContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateEmailAccount(){
    const queryClient = useQueryClient();
    const {setEmailData} = useEmailData();

    const { mutate: updateEmailAccount, isPending: isUpdating } = useMutation({
        mutationKey: ['EmailAccount'],
        mutationFn: async ({id, data}: {id: string, data: Omit<CreateEmailAccountPayload, "id">})=> {
            const response = await emailAccountApi.upDateEmailAccount(id, data)
            return response.data;
        },
        onSuccess: (updatedAccount)=> {
            toast.success("update successful.")
            queryClient.invalidateQueries({queryKey: ['EmailAccount']})
            
            setEmailData((prevData)=> {
                if(!prevData) return null;

                const updatedList = prevData.list.map((ac)=> (
                    ac.id === updatedAccount.id ? updatedAccount : ac
                ))
                return {
                    ...prevData,
                    list: updatedList,
                    totalCount: prevData.totalCount
                }
            })
        },
        onError: (error)=>{
            toast.error(error.message)
        }
    })
    return {updateEmailAccount, isUpdating}
}
