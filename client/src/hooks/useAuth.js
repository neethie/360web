import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "@/services/authAPI";

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: AuthAPI.getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    return { data, isError, isLoading };
};
