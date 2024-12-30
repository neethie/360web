import { useQuery } from "@tanstack/react-query";

import { OrdersAPI } from "@/services/ordersApi";

import OrderRow from "@/components/order/OrderRow";

export default function OrdersView() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["orders"],
        queryFn: OrdersAPI.getAll,
    });

    if (isLoading) return <div className="">Cargando...</div>;
    if (isError) return <div className="">Error: {error.message}</div>;
    if (!data) return <div className="">No hay datos disponibles</div>;

    return (
        <div className="space-y-6">
            <div className="">
                <h2 className="font-semibold text-3xl">Historial de Ordenes</h2>
                <p>{data.length} en total</p>
            </div>

            <table className="w-full p-2 border-spacing-y-12">
                <thead>
                    <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                        <th className="font-normal w-80">Cliente</th>
                        <th className="font-normal w-60">Fecha</th>
                        <th className="font-normal w-36">Total</th>
                        <th className="font-normal w-60">Estado</th>
                        <th className="font-normal text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                        <OrderRow key={order.order_id} order={order} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
