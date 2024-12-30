import * as yup from "yup";

export const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "Mínimo 3 caracteres")
        .max(45, "Máximo 45 caracteres")
        .required("El nombre es obligatorio"),
    brand: yup
        .string()
        .min(3, "Mínimo 3 caracteres")
        .max(45, "Máximo 45 caracteres")
        .required("La marca es obligatoria"),
    price: yup
        .number("Debe ser número")
        .min(1, "Minimo Q1")
        .max(10000, "Máximo Q10,000.00")
        .required("El precio es requerido"),
    stock: yup
        .number("Debe ser número")
        .min(1, "Minimo 1")
        .max(500, "Máximo 500")
        .required("El stock es requerido"),
    category_id: yup.number(),
});
