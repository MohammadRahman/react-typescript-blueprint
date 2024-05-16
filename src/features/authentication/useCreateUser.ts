import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { userService } from "@apis/auth";

export function useCreateUser() {
    const { mutate: createUser, isLoading } = useMutation({
        mutationFn: async (userData) => {
            const response = await userService.createUser(userData);
            console.log(response)
            return response.data;
        },
        onSuccess: (user) => {
            toast.success(
                "Account successfully created! Please verify the new account from the user's email address."
            );
        },
    });

    return { createUser, isLoading };
}