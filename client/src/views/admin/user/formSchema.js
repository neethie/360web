import * as yup from "yup";

export const formSchema = yup.object().shape({
    full_name: yup
        .string()
        .min(5, "Mínimo 5 caracteres")
        .required("El nombre es obligatorio"),
    email: yup
        .string()
        .email("Email inválido")
        .min(5, "Mínimo 5 caracteres")
        .required("El correo es obligatorio"),
    password: yup
        .string()
        .min(5, "La contraseña debe tener un mínimo de 5 caracteres")
        .max(30, "La contraseña debe tener un máximo de 30 caracteres"),
    rol_id: yup.number(),
    is_disabled: yup.number(),
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
