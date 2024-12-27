import { useQuery } from "@tanstack/react-query";

import Category from "./components/panel/categories/Category";

import { Link } from "react-router-dom";
import Button from "../../components/ui/utils/Button";
import { CategoriesAPI } from "../../services/categoriesAPI";

export default function Categories() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: CategoriesAPI.getAll,
    });

    if (isLoading) return <div className="">Cargando...</div>;
    if (isError) return <div className="">Error: {error.message}</div>;
    if (!data) return <div className="">No hay datos disponibles</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-3xl">
                        Todas las categorias
                    </h2>
                    <p>{data.length} en total</p>
                </div>

                <Link to={"create"}>
                    <Button text={"Crear"} classname={"bg-blue-600"} />
                </Link>
            </div>
            <table className="w-full p-2 border-spacing-y-12">
                <thead>
                    <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                        <th className="font-normal w-80">Nombre</th>
                        <th className="font-normal w-60">Estado</th>
                        <th className="font-normal w-36">Productos</th>
                        <th className="font-normal text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody className="">
                    {data.map((category) => (
                        <Category
                            key={category.category_id}
                            category={category}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
