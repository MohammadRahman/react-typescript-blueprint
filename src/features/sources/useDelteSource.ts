import { sourceApi } from "@apis/source/source";
import { useSourceData } from "@context/SourceContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDelete() {
    const queryClient = useQueryClient();
    
    const {sourceData, setSourceData} = useSourceData();

    const {mutate: deleteAccount, isPending: isLoading} = useMutation({
        mutationFn: async (id: string)=> {
            console.log("id received", id)
            const response = await sourceApi.deleteSourceAccount(id);
            return response.data;
        },
        onSuccess: (_, id: string)=> {
            if(sourceData){
               const updatedList = sourceData?.list.filter(acc=> acc.id != id);
                setSourceData({ ...sourceData, list: updatedList });
            }
            toast.success("entry delete successful")
            queryClient.invalidateQueries({queryKey: ['EmailAccount']})
        }
    })
    return {deleteAccount,isLoading}
}
