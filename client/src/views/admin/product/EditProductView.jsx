import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ProductsAPI } from "@/services/productsAPI";

import ProductForm from "@/components/product/ProductForm";
import { formSchema } from "./formSchema";

export default function EditProductView() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const handleForm = (data) => {
        console.log(data);
    };

    const { product_id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadProduct", product_id],
        queryFn: () => ProductsAPI.getById(product_id),
    });

    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data) return "No se encontró";

    const product = data[0];

    return (
        <>
            <h2 className="font-semibold text-3xl">Editar Producto</h2>
            <div>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="grid grid-cols-[3fr_2fr] p-2 rounded-xl gap-4 bg-gray-100"
                >
                    <ProductForm
                        errors={errors}
                        register={register}
                        product={product}
                    />
                </form>
            </div>
        </>
    );
}
