import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { formSchema } from "./formSchema";

import { UsersAPI } from "@/services/usersApi";

import UserForm from "@/components/user/UserForm";

export default function EditUserView() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: UsersAPI.update,
        onSuccess: () => {
            queryClient.invalidateQueries(["loadUser", user_id]);
            navigate("/admin/users");
            toast.info("Has editado un usuario");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { user_id } = useParams();

    const handleForm = (data) => {
        mutate({ ...data, user_id });
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadUser", user_id],
        queryFn: () => UsersAPI.getById(user_id),
    });

    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data) return "No hay datos";
    const user = data[0];
    return (
        <>
            <h2 className="font-semibold text-3xl">Editar Usuario</h2>
            <div>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="grid grid-cols-[2fr_1fr] p-2 rounded-xl gap-4 bg-gray-100"
                >
                    <UserForm errors={errors} register={register} user={user} />
                </form>
            </div>
        </>
    );
}
