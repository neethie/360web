import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { ProductsAPI } from "@/services/productsAPI";

import { toast } from "react-toastify";
import ProductForm from "@/components/product/ProductForm";
import { formSchema } from "./formSchema";

export default function EditProductView() {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: ProductsAPI.update,
        onSuccess: () => {
            toast.success("Se ha editado un producto");
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

    const { product_id } = useParams();

    const handleForm = (data) => {
        const formData = new FormData();
        formData.append("product_id", product_id);
        formData.append("image_url", data.image[0]);
        formData.append("name", data.name);
        formData.append("brand", data.brand);
        formData.append("price", data.price.toFixed(2));
        formData.append("stock", data.stock);
        formData.append("category_id", data.category_id);

        mutate(formData);
    };

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
                        watch={watch}
                    />
                </form>
            </div>
        </>
    );
}
