import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

import ButtonOption from "@/components/ui/ButtonOption";

import { Edit } from "@/utils/constants";
import { CategoriesAPI } from "@/services/categoriesAPI";
import { toast } from "react-toastify";

export default function CategoryRow({ category }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["countProductsCategory", category.category_id],
        queryFn: () => CategoriesAPI.countProducts(category.category_id),
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: CategoriesAPI.updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["getCategories"]);
            toast.info("Editaste una categoria");
        },
        onError: (error) => {
            toast.error(error.cause);
        },
    });

    const handleClick = () => {
        mutate(category.category_id);
    };

    if (isLoading) return "Cargando...";
    if (isError) return "Hubo un error";

    return (
        <tr className="font-semibold text-base h-12">
            <td>
                <p>{category.name}</p>
            </td>
            <td>
                <div
                    className={`flex items-center gap-2 w-max px-2 rounded-full ${
                        category.is_disabled
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                    }`}
                >
                    {category.is_disabled ? (
                        <>
                            <CiCircleRemove />
                            <p>Deshabilitada</p>
                        </>
                    ) : (
                        <>
                            <CiCircleCheck />
                            <p>Habilitada</p>
                        </>
                    )}
                </div>
            </td>
            <td className="">
                <p>{data.count ? data.count : "Sin productos"}</p>
            </td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    {category.is_disabled ? (
                        <ButtonOption
                            option={Edit.Types.accept}
                            label={"Habilitar"}
                            handleClick={handleClick}
                        />
                    ) : (
                        <ButtonOption
                            option={Edit.Types.cancel}
                            label={"Deshabilitar"}
                            handleClick={handleClick}
                        />
                    )}

                    <Link to={`edit/${category.category_id}`}>
                        <ButtonOption
                            option={Edit.Types.edit}
                            label={"Editar"}
                        />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
