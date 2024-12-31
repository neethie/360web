import * as yup from "yup";

export const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "Mínimo 3 caracteres")
        .max(45, "Máximo 45 caracteres")
        .required("El nombre es obligatorio"),
    is_disabled: yup.number(),
});
