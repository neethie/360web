import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import OrderStatus from "@/components/order/OrderStatus";
import ButtonOption from "@/components/ui/ButtonOption";

import { Edit } from "@/utils/constants";
import { convertDate } from "@/utils/date";
import { OrdersAPI } from "@/services/ordersAPI";
import { Status } from "@/utils/constants";

export default function OrderRow({ order, userView }) {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: OrdersAPI.updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleStatus = (status) => {
        toast.info(
            `Has ${
                status === Status.Accepted ? "aceptado" : "rechazado"
            } una orden`
        );
        const data = { order_id: order.order_id, status: status };
        mutate(data);
    };

    return (
        <tr className="font-semibold text-base h-12">
            <td>
                <p>
                    #{order.order_id}
                    {!userView && `, ${order.full_name}`}
                </p>
            </td>
            <td>{convertDate(order.date_creation)}</td>
            <td>Q{order.total_price}</td>
            <td>
                <OrderStatus status={order.status_id} />
            </td>
            {!userView ? (
                <td>
                    <div className="flex flex-row gap-2 justify-center text-white">
                        <ButtonOption
                            option={Edit.Types.accept}
                            handleClick={() => handleStatus(Status.Accepted)}
                        />

                        <ButtonOption
                            option={Edit.Types.cancel}
                            handleClick={() => handleStatus(Status.Rejected)}
                        />

                        <Link to={`edit/${order.order_id}`}>
                            <ButtonOption option={Edit.Types.edit} />
                        </Link>
                    </div>
                </td>
            ) : (
                <td>
                    <Link
                        to={`/order/${order.order_id}`}
                        className="flex items-center justify-center"
                    >
                        Ver
                    </Link>
                </td>
            )}
        </tr>
    );
}
