import { templateApi } from "@apis/email-template";
import { useTemplateData } from "@context/TemplateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateTemplate(){
    const queryClient = useQueryClient();
    const {setTemplateData} = useTemplateData();

    const { mutate: updateTemplate, isPending: isUpdating } = useMutation({
        mutationKey: ['SourceAccount'],
        mutationFn: async (data: any)=> {
            // console.log("payload in update source", data);
            const response = await templateApi.updateTemplate( data);
            return response.data;
        },
        onSuccess: (updatedAccount)=> {
            toast.success("update successful.")
            queryClient.invalidateQueries({queryKey: ['SourceAccount']})
            
            setTemplateData((prevData)=> {
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
    return {updateTemplate, isUpdating}
}
