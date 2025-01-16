import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "@/components/ui/Button";
import { useAppStore } from "@/hooks/useAppStore";
import { useProductStore } from "@/hooks/useProductStore";

export default function ProductCard({ edit, product, preview }) {
    const {
        product_id,
        name,
        brand,
        price,
        stock,
        category_name,
        image_url,
        is_disabled,
    } = product;

    const { addToCart, cart, updateQuantity } = useAppStore();

    const { productsStore } = useProductStore();
    const handleCart = () => {
        const productsStoreIndex = productsStore.findIndex(
            (product) => product.product_id === product_id
        );
        if (productsStoreIndex === -1)
            return toast.error("Ha ocurrido un error");

        if (productsStore[productsStoreIndex].stock === 0) {
            toast.error("No hay suficiente stock");
            return;
        }

        const cartProduct = { product_id, quantity: 1, price };
        if (cart.length) {
            const productIndex = cart.findIndex(
                (item) => item.product_id === product_id
            );

            if (productIndex !== -1) {
                if (
                    productsStore[productsStoreIndex].stock -
                        (cart[productIndex].quantity + 1) <
                    0
                ) {
                    toast.error("No hay suficiente stock");
                    return;
                }
                updateQuantity(product_id, cart[productIndex].quantity + 1);
            } else {
                addToCart(cartProduct);
            }
        } else addToCart(cartProduct);
        toast.success(`Has añadido ${name} a tu carrito`);
    };

    return (
        <div className="w-auto h-max rounded-md border px-1 shadow-md">
            <p
                className={`text-white px-2 w-max absolute rounded-r-full mt-1 shadow-md -ml-1 z-10 ${
                    stock > 0 ? "bg-green-400" : "bg-red-400"
                }`}
            >
                {stock > 0 ? "Existencias: " + stock : "Sin existencias"}
            </p>
            <div className="min-w-[250px] h-[250px] bg-gray-200 flex items-center justify-center relative">
                <img
                    className="w-36 h-36 object-center object-contain bg-gray-200"
                    src={image_url}
                    alt={"imagen"}
                />
            </div>
            <div className="p-2">
                <div className="flex justify-between items-center">
                    <p className="text-xs bg-blue-200 px-2 w-max rounded-full ">
                        {category_name}
                    </p>
                    {is_disabled && (
                        <p className="text-xs bg-red-200 px-2 w-max rounded-full ">
                            Deshabilitado
                        </p>
                    )}
                </div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm">{brand}</p>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-green-500 font-semibold">
                        Q{price}
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
                            <Button
                                text="Agregar"
                                classname={"bg-green-500"}
                                handle={handleCart}
                            />
                        )
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
