import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

import Button from "./Button";

export default function ButtonOption({ option, handleClick, label }) {
    const bgColors = [
        "bg-green-400",
        "bg-red-400",
        "bg-orange-400",
        "bg-yellow-400",
    ];
    const className = `rounded-full p-1 h-5 w-5 ${bgColors[option - 1]}`;

    const getIcon = () => {
        switch (option) {
            case 1: {
                return <FaCheck className={className} />;
            }
            case 2: {
                return <FaTrash className={className} />;
            }
            case 3: {
                return <FaPen className={className} />;
            }
            case 4: {
                return <TbTruckDelivery className={className} />;
            }
        }
    };
    return <Button text={getIcon()} handle={handleClick} label={label} />;
}
