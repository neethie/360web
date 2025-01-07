import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";

import { OrdersAPI } from "@/services/ordersAPI";
import OrderDetailRow from "@/components/order/OrderDetailRow";
import Button from "@/components/ui/Button";

export default function EditOrderView() {
    const { order_id } = useParams();

    const results = useQueries({
        queries: [
            {
                queryKey: ["getOrder", order_id],
                queryFn: () => OrdersAPI.getById(order_id),
            },
            {
                queryKey: ["getOrderDetails", order_id],
                queryFn: () => OrdersAPI.getByMaster(order_id),
            },
        ],
    });

    const order = results[0];
    const orderDetails = results[1];

    if (order.isLoading || orderDetails.isLoading) return "cargando...";
    if (order.isError) return "Hubo un error";
    if (!order.data) return "No hay datos";

    return (
        <>
            <div className="flex justify-between">
                <h2 className="font-semibold text-3xl">Editar orden</h2>
                <Button text="Guardar" classname="bg-blue-600" />
            </div>
            <div className="font-semibold">
                <p>
                    ID Orden:{" "}
                    <span className="font-normal">
                        {order.data[0].order_id}
                    </span>
                </p>
                <p>
                    Cliente:{" "}
                    <span className="font-normal">
                        {order.data[0].client_name}
                    </span>
                </p>
                <p>
                    Total a pagar:{" "}
                    <span className="font-normal">
                        Q{order.data[0].total_price}
                    </span>
                </p>
            </div>
            <table className="w-full p-2 border-spacing-y-12">
                <thead>
                    <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                        <th className="font-normal w-80">Producto</th>
                        <th className="font-normal w-60">Cantidad</th>
                        <th className="font-normal w-36">Subtotal</th>
                        <th className="font-normal text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.data ? (
                        <>
                            {orderDetails.data.map((detail) => (
                                <OrderDetailRow
                                    key={detail.order_details_id}
                                    detail={detail}
                                />
                            ))}
                        </>
                    ) : (
                        "No hay datos para mostrar"
                    )}
                </tbody>
            </table>
        </>
    );
}
