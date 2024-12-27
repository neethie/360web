import OrderStatus from "./OrderStatus";

import { EditType } from "../../../../../utils/constants";
import ButtonOption from "../../../../../components/ui/utils/ButtonOption";

import { convertDate } from "../../../../../utils/date";

export default function Order({ order }) {
    return (
        <tr className="font-semibold text-base h-12">
            <td className="">{order.full_name}</td>
            <td>{convertDate(order.date_creation)}</td>
            <td>Q{order.total_price}</td>
            <td className="">
                <OrderStatus status={order.status_id} />
            </td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <ButtonOption option={EditType.Accept.type} />
                    <ButtonOption option={EditType.Reject.type} />
                    <ButtonOption option={EditType.Edit.type} />
                </div>
            </td>
        </tr>
    );
}
