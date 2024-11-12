import { emailAccountApi} from "@apis/email-account";
import { useMutation } from "@tanstack/react-query";

export function useEmailAccount(){
    const {mutate: emailLists, isPending: isLoading} = useMutation({
        mutationKey: ['emailAccount'],
        mutationFn: async(data: any)=>{
            const response = await emailAccountApi.getEmailLists(data);
            return response.data;
        }
    });
    return {emailLists, isLoading}
}