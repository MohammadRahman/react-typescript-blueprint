import { reportService } from "@apis/reports";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useCreateReport() {
    const { data: report, isPending } = useMutation({
        mutationKey: ['report'],
        mutationFn: async () => {
            const response = await reportService.createReport();
            console.log('reponse', response)
            return response.data;
        },
        onSuccess: () => {
            toast.success("report successfully created");
        },
        onError: (err) => toast.error(err.message),
    })
    return { report, isPending }
}