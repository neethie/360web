import { Link } from "react-router-dom";

import OrderStatus from "@/components/order/OrderStatus";
import ButtonOption from "@/components/ui/ButtonOption";

import { Edit } from "@/utils/constants";
import { convertDate } from "@/utils/date";

export default function OrderRow({ order }) {
    return (
        <tr className="font-semibold text-base h-12">
            <td>
                ({order.order_id}) {order.full_name}
            </td>
            <td>{convertDate(order.date_creation)}</td>
            <td>Q{order.total_price}</td>
            <td>
                <OrderStatus status={order.status_id} />
            </td>
            <td>
                <div className="flex flex-row gap-2 justify-center text-white">
                    <Link to={`accept/${order.order_id}`}>
                        <ButtonOption option={Edit.Types.accept} />
                    </Link>
                    <Link to={`reject/${order.order_id}`}>
                        <ButtonOption option={Edit.Types.cancel} />
                    </Link>
                    <Link to={`edit/${order.order_id}`}>
                        <ButtonOption option={Edit.Types.edit} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
