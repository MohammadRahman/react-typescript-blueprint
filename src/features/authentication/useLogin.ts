import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { userService } from "@apis/auth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isPending: isLoading } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            const response = await userService.login({ email, password });
            return response.data; // Return the data, which should contain the token
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
            navigate('/', { replace: true });
        },
        onError: (err) => {
            console.log('ERROR', err);
            toast.error('Provided email or password are incorrect');
        },
    });

    return { login, isLoading };
}