import { emailAccountApi} from "@apis/email-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useEmailAccount(){
    const queryClient = useQueryClient();

    const {mutate: emailLists, isPending: isLoading} = useMutation({
        mutationKey: ['emailAccount'],
        mutationFn: async(data: any)=>{
            try {
                const response = await emailAccountApi.getEmailLists(data);
                console.log("response in hook",response)
                return response.data;
            } catch (error) {
               console.log(error) 
            }
           
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('email lists successfully fetched.');
        },
        onError: (error)=> {
            toast.error(error.message)
        }
    });
    return {emailLists, isLoading}
}