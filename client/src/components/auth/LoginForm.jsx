import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { useAppStore } from "@/hooks/useAppStore";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("El email es inválido")
        .required("El email es requerido"),
    password: yup
        .string()
        .min(5, "La contraseña debe tener un mínimo de 5 caracteres")
        .max(30, "La contraseña debe tener un máximo de 30 caracteres")
        .required("La contraseña es requerida"),
});

export default function LoginForm() {
    const { setAuthForm, authForm } = useAppStore();

    const handleClick = () => {
        setAuthForm(!authForm);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const handleForm = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className="bg-white p-8 rounded-xl">
                <h3 className="font-semibold text-3xl text-center">
                    ¡Bienvenido de vuelta!
                </h3>
                <p className="text-gray-500 text-center">
                    Ingresa tus credenciales para iniciar sesión en tu cuenta
                </p>

                <form
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                    className="my-2 space-y-4"
                >
                    <div className="space-y-2">
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                        <input
                            type="text"
                            placeholder="Ingresa tu email"
                            className="border py-2 px-4 w-full rounded-xl"
                            {...register("email")}
                        />
                        {errors.password && (
                            <ErrorMessage>
                                {errors.password.message}
                            </ErrorMessage>
                        )}
                        <input
                            type="password"
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
            </div>
            <div className="bg-blue-400 opacity-80 p-4 rounded-xl text-white flex flex-col items-center justify-center">
                <p className="font-semibold text-xl">¿No tienes cuenta?</p>
                <p className="text-sm font-semibold">
                    <button
                        onClick={handleClick}
                        className="hover:text-blue-900 transition-all"
                    >
                        Click aqui
                    </button>{" "}
                    para registrarte
                </p>
            </div>
        </>
    );
}
