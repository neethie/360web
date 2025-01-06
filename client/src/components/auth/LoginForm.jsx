import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { AuthAPI } from "@/services/authAPI";
import { useAppStore } from "@/hooks/useAppStore";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("El email es inválido")
        .required("El email es requerido")
        .default(""),
    password: yup
        .string()
        .min(5, "La contraseña debe tener un mínimo de 5 caracteres")
        .max(30, "La contraseña debe tener un máximo de 30 caracteres")
        .required("La contraseña es requerida")
        .default(""),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { setSelectRole } = useAppStore();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: AuthAPI.login,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.refetchQueries(["user"]).then(() => {
                const data = queryClient.getQueryData(["user"]);
                if (data.rol_id === 1) return navigate("/");
                setSelectRole(true);
            });
        },
    });

    const handleForm = (data) => {
        mutate(data);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleForm)}
                noValidate
                className="my-2 space-y-4 w-2/3"
            >
                <div className="space-y-2">
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    <input
                        type="text"
                        id="form_login_email"
                        placeholder="Ingresa tu email"
                        className="border py-2 px-4 w-full rounded-xl"
                        {...register("email")}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                    <input
                        type="password"
                        id="form_login_password"
                        placeholder="Contraseña"
                        className="border py-2 px-4 w-full rounded-xl"
                        {...register("password")}
                    />
                </div>
                <input
                    type="submit"
                    value="Iniciar sesión"
                    className="border py-2 px-4 w-full rounded-xl bg-blue-400 text-white opacity-80 hover:opacity-100 cursor-pointer"
                />
            </form>
        </>
    );
}
