import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import OrderStatus from "@/components/order/OrderStatus";
import ButtonOption from "@/components/ui/ButtonOption";

import { Edit } from "@/utils/constants";
import { convertDate } from "@/utils/date";
import { OrdersAPI } from "@/services/ordersAPI";

export default function OrderRow({ order, userView }) {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: OrdersAPI.updateStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            toast.success(`Has respondido una orden`);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleStatus = (status) => {
        const data = { order_id: order.order_id, status: status };
        mutate(data);
    };

    return (
        <tr className="font-semibold text-base h-12">
            <td>
                ({order.order_id}) {!userView && order.full_name}
            </td>
            <td>{convertDate(order.date_creation)}</td>
            <td>Q{order.total_price}</td>
            <td>
                <OrderStatus status={order.status_id} />
            </td>
            {!userView && (
                <td>
                    <div className="flex flex-row gap-2 justify-center text-white">
                        <ButtonOption
                            option={Edit.Types.accept}
                            handleClick={() => handleStatus(2)}
                        />

                        <ButtonOption
                            option={Edit.Types.cancel}
                            handleClick={() => handleStatus(3)}
                        />

                        <Link to={`edit/${order.order_id}`}>
                            <ButtonOption option={Edit.Types.edit} />
                        </Link>
                    </div>
                </td>
            )}
        </tr>
    );
}
