import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import CategoryForm from "@/components/category/CategoryForm";

import { formSchema } from "./formSchema";
import { CategoriesAPI } from "@/services/categoriesAPI";

export default function EditCategoryView() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: CategoriesAPI.update,
        onSuccess: () => {
            toast.success("Se ha editado una categoria");
            queryClient.invalidateQueries({ queryKey: ["loadCategories"] });
            queryClient.invalidateQueries({
                queryKey: ["getCategory", category_id],
            });
            navigate("/admin/categories");
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
    });

    const { category_id } = useParams();

    const handleForm = (data) => {
        data = { ...data, category_id };
        mutate(data);
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["getCategory", category_id],
        queryFn: () => CategoriesAPI.getById(category_id),
    });

    if (isLoading) return "cargando...";
    if (isError) return "Hubo un error";
    if (!data) return "No hay datos";

    const category = data;
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
