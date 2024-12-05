import { templateApi } from '@apis/email-template';
import { useTemplateData } from '@context/TemplateContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useDeleteTemplate = () => {
    const queryClient = useQueryClient();
    
    const {template, setTemplateData} = useTemplateData();

    const {mutate: deleteTemplate, isPending: isLoading} = useMutation({
        mutationFn: async (id: string)=> {
            console.log("id received", id)
            const response = await templateApi.deleteTemplate(id);
            return response.data;
        },
        onSuccess: (_, id: string)=> {
            if(template){
               const updatedList = template?.list.filter(acc=> acc.id != id);
                setTemplateData({ ...template, list: updatedList });
            }
            toast.success("entry delete successful")
            queryClient.invalidateQueries({queryKey: ['EmailAccount']})
        }
    })
    return {deleteTemplate,isLoading}
}
