import { useQuery } from "@tanstack/react-query";

import { OrdersAPI } from "@/services/ordersAPI";
import OrderRow from "../../../components/order/OrderRow";

export default function UserOrdersView({ user }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadUserOrders", user.user_id],
        queryFn: () => OrdersAPI.getByUserId(user.user_id),
    });

    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data.length) return "No hay datos para mostrar";
    if (data)
        return (
            <div className="mt-5">
                <div className="space-y-2">
                    <table className="w-full p-2 border-spacing-y-12">
                        <thead>
                            <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                                <th className="font-normal w-32">No. Orden</th>
                                <th className="font-normal w-60">Fecha</th>
                                <th className="font-normal w-36">Total</th>
                                <th className="font-normal w-60">Estado</th>
                                <th className="font-normal w-auto">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 && <tr>No hay datos</tr>}
                            {data.map((order) => (
                                <OrderRow
                                    key={order.order_id}
                                    order={order}
                                    userView
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
}
