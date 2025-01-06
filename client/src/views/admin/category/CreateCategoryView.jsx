import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { CategoriesAPI } from "@/services/categoriesAPI";

import { formSchema } from "./formSchema";
import CategoryForm from "@/components/category/CategoryForm";
import { toast } from "react-toastify";

export default function CreateCategoryView() {
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: CategoriesAPI.create,
        onSuccess: () => {
            toast.success("Se ha creado una categoria");
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

    const handleForm = (data) => {
        mutate(data);
    };
    return (
        <>
            <h2 className="font-semibold text-3xl">Crear Categoria</h2>
            <div>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="w-2/3 p-2 rounded-xl gap-4 bg-gray-100"
                >
                    <CategoryForm errors={errors} register={register} />
                </form>
            </div>
        </>
    );
}
