import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { OrdersAPI } from "../../services/ordersAPI";
import OrderStatus from "../../components/order/OrderStatus";
import { Status } from "../../utils/constants";
import Button from "../../components/ui/Button";

export default function OrderView() {
    const { order_id } = useParams();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: OrdersAPI.cancel,
        onSuccess: () => {
            toast.info("Cancelaste tu orden");
            queryClient.refetchQueries(["loadOrder", order_id]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleClick = () => {
        mutate({ order_id });
    };

    const results = useQueries({
        queries: [
            {
                queryKey: ["loadOrder", order_id],
                queryFn: () => OrdersAPI.getById(order_id),
                retry: 1,
            },
            {
                queryKey: ["loadByOrderId", order_id],
                queryFn: () => OrdersAPI.getByMaster(order_id),
                retry: 1,
            },
        ],
    });

    const order = results[0];
    const details = results[1];

    if (order.isLoading || details.isLoading) return "Cargando...";
    if (order.isError || details.isError) return <Navigate to="/" />;
    if (!order.data || !details.data) return "Error";

    return (
        <>
            <div className="flex justify-center w-screen relative">
                <div className="bg-blue-400 h-40 w-full"></div>
                <div className="p-10 bg-white w-3/5 absolute top-10 z-10 shadow-xl border">
                    <div className="flex gap-4 items-center justify-between">
                        <h3 className="text-3xl font-semibold">
                            Resumen orden #{order.data[0].order_id}{" "}
                        </h3>
                        <OrderStatus status={order.data[0].status_id} />
                    </div>
                    <section className="font-semibold border-t-2 border-b-2 py-2 my-2">
                        <p className="text-center">Datos de facturación</p>
                        <p>
                            Nombre:{" "}
                            <span className="font-normal">
                                {order.data[0].client_name}
                            </span>
                        </p>
                        <p>
                            Teléfono:{" "}
                            <span className="font-normal">
                                {order.data[0].client_phone}
                            </span>
                        </p>
                        <p>
                            Dirección:{" "}
                            <span className="font-normal">
                                {order.data[0].address}
                            </span>
                        </p>
                        <p>
                            Total a pagar:{" "}
                            <span>
                                <span className="font-normal">
                                    Q{order.data[0].total_price}
                                </span>
                            </span>
                        </p>
                    </section>
                    <section className="font-semibold border-t-2 border-b-2 py-2 my-2">
                        <p className="text-center">Detalles</p>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <td>Producto</td>
                                    <td>Unidades</td>
                                    <td>Subtotal</td>
                                </tr>
                            </thead>
                            <tbody className="font-normal">
                                {details.data.map((product) => (
                                    <tr key={product.order_details_id}>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>Q{product.subtotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    {order.data[0].status_id === Status.Pending && (
                        <div className="flex flex-col items-center justify-center gap-1">
                            <p className="text-sm">
                                Puedes cancelar la orden aún
                            </p>
                            <Button
                                text={"Cancelar"}
                                classname={"bg-red-400"}
                                handle={handleClick}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
