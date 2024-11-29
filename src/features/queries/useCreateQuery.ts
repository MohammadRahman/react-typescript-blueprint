import { queryApi } from "@apis/query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateQuery(){
    const {mutate: createQuery, isPending: isCreating}= useMutation({
        mutationKey: ['Query'],
        mutationFn: async(data: any)=>{
            const response = await queryApi.createQuery(data);
            return response.data;
        },
        onSuccess: ()=> {
            toast.success('query create successful.')
        },
        onError: (error)=> {
            toast.error(error.message);
        }
    })

    return {createQuery, isCreating}
}