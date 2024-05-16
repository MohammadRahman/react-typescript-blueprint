import { userService } from "@apis/auth";
import { useQuery } from "@tanstack/react-query";


export function useUser(token: string | null) {
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => token ? userService.currentUser(token) : null, // Pass the token to the userService.currentUser function if it exists
        enabled: !!token, // Enable the query only if the token exists
    });

    console.log("from use user-hook", user);

    return { isLoading, user, isAuthenticated: !!user }; // Use !!user to check if user exists
}