import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function ProductCard({ edit, product }) {
    const { product_id, name, brand, price } = product;
    return (
        <div className="w-auto h-max rounded-md border px-1 shadow-md">
            <div className="min-w-[250px] h-[250px] bg-gray-200"></div>
            <div className="p-2">
                <p className="font-semibold">
                    {name}
                    {!!edit && <span> ({product_id})</span>}
                </p>
                <p className="text-sm">{brand}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-green-500 font-semibold">
                        Q{price}.00
                    </p>
                    {edit ? (
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
                    )}
                </div>
            </div>
        </div>
    );
}
