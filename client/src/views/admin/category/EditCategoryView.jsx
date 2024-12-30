import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CategoryForm from "@/components/category/CategoryForm";

import { formSchema } from "./formSchema";
import { CategoriesAPI } from "@/services/categoriesAPI";

export default function EditCategoryView() {
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

    const { category_id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["getCategory", category_id],
        queryFn: () => CategoriesAPI.getById(category_id),
    });

    if (isLoading) return "cargando...";
    if (isError) return "Hubo un error";
    if (!data) return "No hay datos";

    const category = data[0];
    return (
        <>
            <h2 className="font-semibold text-3xl">Editar Categoria</h2>
            <div>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="w-2/3 p-2 rounded-xl gap-4 bg-gray-100"
                >
                    <CategoryForm
                        errors={errors}
                        register={register}
                        category={category}
                    />
                </form>
            </div>
        </>
    );
}
