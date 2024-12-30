import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ProductForm from "../../../components/product/ProductForm";
import { formSchema } from "./formSchema";

export default function CreateProductView() {
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
            <h2 className="font-semibold text-3xl">Nuevo Producto</h2>
            <div>
                <form
                    onSubmit={handleSubmit(handleForm)}
                    className="grid grid-cols-[3fr_2fr] p-2 rounded-xl gap-4 bg-gray-100"
                >
                    <ProductForm errors={errors} register={register} />
                </form>
            </div>
        </>
    );
}
