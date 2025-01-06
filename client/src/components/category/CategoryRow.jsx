import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

import ButtonOption from "@/components/ui/ButtonOption";

import { Edit } from "@/utils/constants";
import { CategoriesAPI } from "@/services/categoriesAPI";

export default function CategoryRow({ category }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["countProductsCategory", category.category_id],
        queryFn: () => CategoriesAPI.countProducts(category.category_id),
    });
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
                <p>{data[0][""] ? data[0][""] : "Sin productos"}</p>
            </td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <Link to={`delete/${category.category_id}`}>
                        <ButtonOption option={Edit.Types.cancel} />
                    </Link>
                    <Link to={`edit/${category.category_id}`}>
                        <ButtonOption option={Edit.Types.edit} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
