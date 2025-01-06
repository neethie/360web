import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useAppStore } from "@/hooks/useAppStore";

import { AuthAPI } from "@/services/authAPI";

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
    full_name: yup
        .string()
        .min(5, "Nombre muy corto")
        .max(30, "Nombre muy largo")
        .required("El nombre es requerido"),
    phone: yup
        .string()
        .matches(/^\d{8}$/, "El número debe tener 8 dígitos")
        .required("El numero de telefóno es requerido"),
    address: yup
        .string()
        .min(5, "Dirección muy corta")
        .max(50, "Dirección muy larga")
        .required("La dirección es requerida"),
    birthday: yup
        .date("La fecha de nacimiento es requerida")
        .typeError("La fecha de nacimiento es requerida")
        .test("isMajor", "Debes ser mayor de 18 años", (value) =>
            verifyAge(value)
        )
        .required("La fecha de nacimiento es requerida"),
});

const verifyAge = (date) => {
    const todayDate = new Date();
    if (todayDate.getFullYear() - date.getFullYear() > 18) return true;
    return false;
};

export default function RegisterForm() {
    const { setAuthForm } = useAppStore();

    const { mutate } = useMutation({
        mutationFn: AuthAPI.register,
        onSuccess: () => {
            toast.success(
                "Te has registrado correctamente, inicia sesión ahora"
            );
            setAuthForm(0);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const handleForm = (data) => {
        data = { ...data, rol_id: 1 };
        mutate(data);
    };

    return (
        <>
            <div className="bg-white px-10 rounded-xl flex flex-col justify-center items-center">
                <h3 className="font-semibold text-3xl text-center">
                    Crear <span className="text-blue-400">Cuenta</span>
                </h3>

                <form
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                    className="my-2 space-y-4"
                >
                    <div className="space-y-2">
                        <legend className="font-semibold">Credenciales</legend>

                        <div className="">
                            {errors.email && (
                                <ErrorMessage>
                                    {errors.email.message}
                                </ErrorMessage>
                            )}
                            <label
                                htmlFor="form_register_email"
                                className="text-sm"
                            >
                                Correo
                            </label>
                            <input
                                type="text"
                                placeholder="Ingresa tu email"
                                id="form_register_email"
                                className="border py-2 px-4 w-full rounded-xl"
                                {...register("email")}
                            />
                        </div>
                        <div className="">
                            {errors.password && (
                                <ErrorMessage>
                                    {errors.password.message}
                                </ErrorMessage>
                            )}
                            <label
                                htmlFor="form_register_password"
                                className="text-sm"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="form_register_password"
                                placeholder="Contraseña"
                                className="border py-2 px-4 w-full rounded-xl"
                                {...register("password")}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <legend className="font-semibold">
                            Información personal
                        </legend>
                        <div className="flex flex-row gap-4">
                            <div className="">
                                {errors.full_name && (
                                    <ErrorMessage>
                                        {errors.full_name.message}
                                    </ErrorMessage>
                                )}
                                <label
                                    htmlFor="form_register_full_name"
                                    className="text-sm"
                                >
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ingresa tu nombre completo"
                                    id="form_register_full_name"
                                    className="border py-2 px-4 w-full rounded-xl"
                                    {...register("full_name")}
                                />
                            </div>

                            <div className="flex flex-col">
                                {errors.phone && (
                                    <ErrorMessage>
                                        {errors.phone.message}
                                    </ErrorMessage>
                                )}
                                <label
                                    htmlFor="form_register_phone"
                                    className="text-sm"
                                >
                                    Número de teléfono
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ingresa tu teléfono"
                                    id="form_register_phone"
                                    className="border py-2 px-4 w-full rounded-xl"
                                    {...register("phone")}
                                />
                            </div>
                        </div>

                        <div className="">
                            {errors.address && (
                                <ErrorMessage>
                                    {errors.address.message}
                                </ErrorMessage>
                            )}
                            <label htmlFor="form_register_address">
                                Dirección
                            </label>
                            <textarea
                                id="form_register_address"
                                className="border py-2 px-4 w-full rounded-xl h-16 max-h-16"
                                placeholder="Ingresa tu dirección"
                                {...register("address")}
                            />
                        </div>
                        <div className="flex flex-col">
                            {errors.birthday && (
                                <ErrorMessage>
                                    {errors.birthday.message}
                                </ErrorMessage>
                            )}
                            <label htmlFor="form_register_birthday">
                                Fecha de nacimiento
                            </label>
                            <input
                                type="date"
                                id="form_register_birthday"
                                className="border py-2 px-4 w-full rounded-xl"
                                max={new Date().toISOString().split("T")[0]}
                                {...register("birthday")}
                            />
                        </div>
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
