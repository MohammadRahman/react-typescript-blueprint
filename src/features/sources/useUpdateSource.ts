import { sourceApi } from "@apis/source/source";
import { useSourceData } from "@context/SourceContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateSourceAccount(){
    const queryClient = useQueryClient();
    const {setSourceData} = useSourceData();

    const { mutate: updateSourceAccount, isPending: isUpdating } = useMutation({
        mutationKey: ['SourceAccount'],
        mutationFn: async (data: any)=> {
            const response = await sourceApi.updateSourceData(data);
            return response.data;
        },
        onSuccess: (updatedAccount)=> {
            toast.success("update successful.")
            queryClient.invalidateQueries({queryKey: ['SourceAccount']})
            
            setSourceData((prevData)=> {
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
    return {updateSourceAccount, isUpdating}
}
