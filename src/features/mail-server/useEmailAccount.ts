import { emailAccountApi} from "@apis/email-account";
import { useEmailData } from "@context/EmailAccountContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export type EmailListData = {
    list: any[];
    totalCount: number;
  };

type UseEmailAccountProps = {
    onSuccessCallback?: (data: EmailListData)=> void;
}
export function useEmailAccount(){
    const { setEmailData } = useEmailData();
    const queryClient = useQueryClient();

    const {mutate: emailLists, isPending: isLoading} = useMutation({
        mutationKey: ['EmailAccount'],
        mutationFn: async(data: any)=>{
            try {
                const response = await emailAccountApi.getEmailLists(data);
                console.log("response in hook",response)
                return response.data;
            } catch (error: AxiosError | any) {
               console.log(error) 
               toast.error(error.message)
            }
           
        },
        onMutate: () => {
            // Set loading to true before mutation starts
            setEmailData((prevState) => ({
              ...prevState!,
              isLoading: true,
            }));
          },
        onSuccess: (data) => {
            setEmailData({
                list: data.list,
                totalCount: data.totalCount,
                isLoading: false, // Once data is fetched, stop loading
                currentPage: data.currentPage || 1, // Assuming currentPage is in the response
              });
            queryClient.invalidateQueries({ queryKey: ['EmailAccount'] });
            toast.success('email lists successfully fetched.');
        },
        onError: (error)=> {
            toast.error(error.message)
        }
    });
    return {emailLists, isLoading}
}