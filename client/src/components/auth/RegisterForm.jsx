import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppStore } from "@/hooks/useAppStore";
import ErrorMessage from "@/components/ui/ErrorMessage";

import * as yup from "yup";

const registerSchema = yup.object().shape({
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

export default function RegisterForm() {
    const { setAuthForm } = useAppStore();

    const handleClick = () => {
        setAuthForm(0);
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const handleForm = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className="bg-blue-400 opacity-80 p-4 rounded-xl text-white flex flex-col items-center justify-center">
                <p className="font-semibold text-xl">¿Ya tienes cuenta?</p>
                <p className="text-sm font-semibold">
                    <button
                        onClick={handleClick}
                        className="hover:text-blue-900 transition-all"
                    >
                        Click aqui
                    </button>{" "}
                    para iniciar sesión
                </p>
            </div>
            <div className="bg-white p-8 rounded-xl">
                <h3 className="font-semibold text-3xl text-center">
                    ¡Bienvenido por primera vez!
                </h3>
                <p className="text-gray-500 text-center">
                    Ingresa unas credenciales para crear una cuenta
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
                        value="Registrarse"
                        className="border py-2 px-4 w-full rounded-xl bg-blue-400 text-white opacity-80 hover:opacity-100 cursor-pointer"
                    />
                </form>
            </div>
        </>
    );
}
