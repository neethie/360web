import { CiClock2 } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

import { Status } from "../../../../../utils/constants";

export default function OrderStatus({ status }) {
    const getColor = () => {
        switch (status) {
            case Status.Pending.type:
                return "bg-blue-200 text-blue-800";
            case Status.Accepted.type:
                return "bg-green-200 text-green-800";
            case Status.Rejected.type:
                return "bg-red-200 text-red-800";
        }
    };

    const getLabel = () => {
        switch (status) {
            case Status.Pending.type:
                return Status.Pending.label;
            case Status.Accepted.type:
                return Status.Accepted.label;
            case Status.Rejected.type:
                return Status.Accepted.label;
        }
    };

    return (
        <div
            className={`flex items-center gap-2 w-max px-2 rounded-full ${getColor()}`}
        >
            {status === Status.Pending.type && <CiClock2 />}
            {status === Status.Accepted.type && <CiCircleCheck />}
            {status === Status.Rejected.type && <CiCircleRemove />}
            <p>{getLabel()}</p>
        </div>
    );
}
