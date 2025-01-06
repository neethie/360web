import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ProductForm from "@/components/product/ProductForm";
import { toast } from "react-toastify";

import { ProductsAPI } from "@/services/productsAPI";
import { formSchema } from "./formSchema";

export default function CreateProductView() {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: ProductsAPI.create,
        onSuccess: () => {
            toast.success("Se ha creado un producto");
            navigate("/admin/products");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const handleForm = (data) => {
        const formData = new FormData();
        formData.append("image_url", data.image[0]);
        formData.append("name", data.name);
        formData.append("brand", data.brand);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("category_id", data.category_id);

        mutate(formData);
    };
    return (
        <>
            <h2 className="font-semibold text-3xl">Nuevo Producto</h2>
            <div>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="grid grid-cols-[3fr_2fr] p-2 rounded-xl gap-4 bg-gray-100"
                >
                    <ProductForm
                        errors={errors}
                        register={register}
                        watch={watch}
                    />
                </form>
            </div>
        </>
    );
}
