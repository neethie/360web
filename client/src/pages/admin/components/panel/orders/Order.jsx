import OrderStatus from "./OrderStatus";

import { EditType } from "../../../../../utils/constants";
import ButtonOption from "../../../../../components/ui/utils/ButtonOption";

export default function Order({ order }) {
    return (
        <tr key={order.id} className="font-semibold text-base h-12">
            <td className="">{order.client}</td>
            <td>{order.date}</td>
            <td>{order.total}</td>
            <td className="">
                <OrderStatus status={order.status} />
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
