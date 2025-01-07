import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { formSchema } from "@/views/admin/user/formSchema";

import UserAccountForm from "@/components/user/UserAccountForm";
import { UsersAPI } from "@/services/usersAPI";

export default function UserAccountView({ user }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadUser", user.user_id],
        queryFn: () => UsersAPI.getById(user.user_id),
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: UsersAPI.update,
        onSuccess: () => {
            queryClient.invalidateQueries(["loadUser", user.user_id]);
            toast.info("Has editado tu cuenta");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const handleForm = (data) => {
        mutate({ ...data, user_id: user.user_id });
    };

    if (isLoading) return "Cargando...";
    if (isError) return "Hubo un error";
    if (!data) return "No hay datos para mostrar";
    return (
        <div className="mt-5">
            <p>Modifica tu información personal aquí</p>

            <form
                onSubmit={handleSubmit(handleForm)}
                className=" p-2 rounded-xl gap-4 bg-gray-100"
            >
                <UserAccountForm
                    errors={errors}
                    register={register}
                    user={data[0]}
                />
            </form>
        </div>
    );
}
