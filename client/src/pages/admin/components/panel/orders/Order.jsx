import OrderStatus from "./OrderStatus";

import { EditType } from "../../../../../utils/constants";
import ButtonOption from "../../../../../components/ui/utils/ButtonOption";

import { convertDate } from "../../../../../utils/date";

import { Link } from "react-router-dom";

export default function Order({ order }) {
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
                        <ButtonOption option={EditType.Accept.type} />
                    </Link>
                    <Link to={`reject/${order.order_id}`}>
                        <ButtonOption option={EditType.Reject.type} />
                    </Link>
                    <Link to={`edit/${order.order_id}`}>
                        <ButtonOption option={EditType.Edit.type} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
