import { queryApi, QueryPayload } from "@apis/query";
import { usequeryData } from "@context/QueryContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateQuery(){
    const queryClient = useQueryClient();
    const {setQueryData} = usequeryData();

    const { mutate: updateQueryData, isPending: isUpdating } = useMutation({
        mutationKey: ['QueryData'],
        mutationFn: async (data: QueryPayload)=> {
            const response = await queryApi.updateQuery(data)
            return response.data;
        },
        onSuccess: (updatedAccount)=> {
            toast.success("update successful.")
            queryClient.invalidateQueries({queryKey: ['QueryData']})
            
            setQueryData((prevData)=> {
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
    return {updateQueryData, isUpdating}
}
