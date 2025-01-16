import { Link } from "react-router-dom";
import ProductCartCard from "./ProductCartCard";
import { useAppStore } from "../../hooks/useAppStore";
import { useMemo } from "react";

export default function PanelCart({ checkout }) {
    const { cart, resetCart } = useAppStore();

    const total = useMemo(() => {
        const subtotales = cart.map((item) => item.price * item.quantity);
        return subtotales.reduce((pre, actual) => pre + actual, 0);
    }, [cart]);

    if (!cart.length) return <p>No hay productos en el carrito</p>;

    const handleReset = () => {
        resetCart();
    };
    return (
        <>
            <div className="">
                <table className="w-full table-auto border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-center">
                            <th className="w-48">Producto</th>
                            <th className="w-24">Cantidad</th>
                            <th className="w-24">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {cart.map((item) => (
                                <ProductCartCard
                                    key={item.product_id}
                                    productCart={item}
                                />
                            ))}
                        </>
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <p className="font-semibold">
                    Total:{" "}
                    <span className="font-normal">${total.toFixed(2)}</span>
                </p>
            </div>

            {!checkout && (
                <Link
                    to={"/cart"}
                    className="px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-center text-white"
                >
                    Checkout
                </Link>
            )}
            <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-300 hover:bg-red-400 rounded-md text-center text-white"
            >
                Limpiar carrito
            </button>
        </>
    );
}
