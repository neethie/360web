import { Link } from "react-router-dom";
import Button from "../utils/Button";

export default function ProductCard({ edit, product }) {
    const { id, name, brand, price } = product;
    return (
        <div className="w-max h-max rounded-md border ">
            <div className="w-[250px] h-[250px] bg-gray-200"></div>
            <div className="p-2">
                <p className="font-semibold">
                    {name} ({id})
                </p>
                <p className="text-sm">{brand}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-green-500 font-semibold">
                        Q{price}.00
                    </p>
                    {edit ? (
                        <>
                            <Link to={"edit/1"}>
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
