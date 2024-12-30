import { Link } from "react-router-dom";
import ButtonOption from "@/components/ui/ButtonOption";

import { Edit } from "@/utils/constants";

export default function OrderDetailRow({ detail }) {
    return (
        <tr className="font-semibold text-base h-12">
            <td>{detail.name}</td>
            <td>{detail.quantity}</td>
            <td>Q{detail.subtotal}</td>
            <td>
                <div className="flex flex-row gap-2 justify-center text-white">
                    <Link to={`reject/${detail.order_details_id}`}>
                        <ButtonOption option={Edit.Types.cancel} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
