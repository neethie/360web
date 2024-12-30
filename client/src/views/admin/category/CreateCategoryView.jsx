import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { formSchema } from "./formSchema";
import CategoryForm from "@/components/category/CategoryForm";

export default function CreateCategoryView() {
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
