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
    rol_id: yup.number(),
    is_disabled: yup.number(),
});
