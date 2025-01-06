import { useQuery } from "@tanstack/react-query";
import Button from "../ui/Button";
import { useProductStore } from "../../hooks/useProductStore";
import { useAppStore } from "../../hooks/useAppStore";
import { ProductsAPI } from "../../services/productsAPI";

export default function ProductCartCard({ productCart }) {
    const { product_id } = productCart;

    const { data, isError } = useQuery({
        queryKey: ["loadProduct", product_id],
        queryFn: () => ProductsAPI.getById(product_id),
    });

    const { cart, updateQuantity, removeFromCart } = useAppStore();

    const { productsStore } = useProductStore();
    const handleCart = (add) => {
        const productsStoreIndex = productsStore.findIndex(
            (product) => product.product_id === product_id
        );
        if (productsStoreIndex === -1) return;

        const productIndex = cart.findIndex(
            (item) => item.product_id === product_id
        );

        if (productIndex === -1) return;

        if (add) {
            // Sumar

            if (productsStore[productsStoreIndex].stock === 0) {
                return;
            }
            if (
                productsStore[productsStoreIndex].stock -
                    (cart[productIndex].quantity + 1) <=
                0
            ) {
                return;
            }
            updateQuantity(product_id, cart[productIndex].quantity + 1);
        } else {
            if (cart[productIndex].quantity === 1) {
                removeFromCart(product_id);
                return;
            }
            updateQuantity(product_id, cart[productIndex].quantity - 1);
        }
    };

    if (isError) return "Error";

    if (data)
        return (
            <tr>
                <td>
                    <div className="flex items-center gap-2">
                        <img
                            src={data[0].image_url}
                            alt="imagen"
                            className="w-12 h-12 object-contain"
                        />
                        <p>{data[0].name}</p>
                    </div>
                </td>
                <td>
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            text={"+"}
                            classname={"bg-green-400"}
                            handle={() => handleCart(true)}
                        />

                        <p>{productCart.quantity}</p>
                        <Button
                            text={"-"}
                            classname={"bg-red-400"}
                            handle={() => handleCart(false)}
                        />
                    </div>
                </td>
                <td>
                    <div className="flex justify-center items-center">
                        Q{data[0].price * productCart.quantity}
                    </div>
                </td>
            </tr>
        );
}
