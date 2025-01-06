import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";

export default function ProductCard({ edit, product, preview }) {
    const { product_id, name, brand, price, stock, category_name, image_url } =
        product;

    return (
        <div className="w-auto h-max rounded-md border px-1 shadow-md">
            <p
                className={`text-white px-2 w-max absolute rounded-r-full mt-1 shadow-md -ml-1 ${
                    stock > 0 ? "bg-green-400" : "bg-red-400"
                }`}
            >
                {stock > 0 ? "Existencias: " + stock : "Sin existencias"}
            </p>
            <div className="min-w-[250px] h-[250px] bg-gray-200 flex items-center justify-center">
                <img
                    className="w-36 h-36 object-center object-contain bg-gray-200"
                    src={image_url}
                    alt={"imagen"}
                />
            </div>
            <div className="p-2">
                <p className="text-xs bg-gray-200 px-2 w-max rounded-full ">
                    {category_name}
                </p>
                <p className="font-semibold">
                    {product_id}) {name}
                </p>
                <p className="text-sm">{brand}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-green-500 font-semibold">
                        Q{price}.00
                    </p>
                    {!preview ? (
                        edit ? (
                            <>
                                <Link to={`edit/${product_id}`}>
                                    <Button
                                        text="Editar"
                                        classname={"bg-blue-500"}
                                    />
                                </Link>
                            </>
                        ) : (
                            <Button text="Agregar" classname={"bg-green-500"} />
                        )
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
