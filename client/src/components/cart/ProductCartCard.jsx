import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "@/hooks/useProductStore";
import { useAppStore } from "@/hooks/useAppStore";
import { ProductsAPI } from "@/services/productsAPI";
import { FaMinus, FaPlus } from "react-icons/fa6";

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
                    (cart[productIndex].quantity + 1) <
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
                    <div className="flex justify-center items-center gap-2 text-white">
                        <button
                            className=" bg-green-400 rounded-full p-1"
                            onClick={() => handleCart(true)}
                        >
                            <FaPlus className="w-2 h-2" />
                        </button>
                        <p className="text-black">{productCart.quantity}</p>
                        <button
                            className=" bg-red-400 rounded-full p-1"
                            onClick={() => handleCart(false)}
                        >
                            <FaMinus className="w-2 h-2" />
                        </button>
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
