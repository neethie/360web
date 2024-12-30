import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";

import { ProductsAPI } from "@/services/productsAPI";
import { useQuery } from "@tanstack/react-query";

export default function ProductsView() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["getProducts"],
        queryFn: ProductsAPI.getAll,
    });

    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data) return "No hay datos disponibles";

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-3xl">
                        Todos los productos
                    </h2>
                    <p>{data.length} en total</p>
                </div>
                <Link to={"create"}>
                    <Button text={"Crear"} classname={"bg-blue-600"} />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2 ">
                {data.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        edit
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}
