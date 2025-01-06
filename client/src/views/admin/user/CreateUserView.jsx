import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { formSchema } from "./formSchema";

import UserForm from "@/components/user/UserForm";
import { AuthAPI } from "../../../services/authAPI";

export default function CreateUserView() {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: AuthAPI.register,
        onSuccess: () => {
            toast.success("Se ha registrado un usuario");
            navigate("/admin/users");
        },
        onError: (error) => {
            toast.error(error);
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
        mutate(data);
    };

    return (
        <>
            <h2 className="font-semibold text-3xl">Crear Usuario</h2>
            <div>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="grid grid-cols-[2fr_1fr] p-2 rounded-xl gap-4 bg-gray-100"
                >
                    <UserForm errors={errors} register={register} />
                </form>
            </div>
        </>
    );
}
