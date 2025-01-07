import { Status } from "@/utils/constants";

import { CiClock2 } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";

export default function OrderStatus({ status }) {
    return (
        <div
            className={`flex items-center gap-2 w-max px-2 rounded-full ${Status.Types[status].colors}`}
        >
            {status === Status.Pending && <CiClock2 />}
            {status === Status.Accepted && <CiCircleCheck />}
            {status === Status.Rejected && <CiCircleRemove />}
            {status === Status.Cancelled && <CiCircleRemove />}
            {status === Status.Delivered && <TbTruckDelivery />}
            <p>{Status.Types[status].label}</p>
        </div>
    );
}
