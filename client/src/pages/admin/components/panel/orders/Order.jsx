import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import { CiClock2 } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import Button from "../../../../../components/ui/utils/Button";

export default function Order({ order }) {
    return (
        <tr key={order.id} className="font-semibold text-base h-12">
            <td>{order.client}</td>
            <td>{order.date}</td>
            <td>{order.total}</td>
            <td className="">
                {order.status === "Pendiente" && (
                    <div className="flex items-center gap-2 bg-blue-200 w-max px-2 rounded-full">
                        <CiClock2 />
                        <p className="text-blue-800">{order.status}</p>
                    </div>
                )}
                {order.status === "Aceptado" && (
                    <div className="flex items-center gap-2 bg-green-200 w-max px-2 rounded-full">
                        <CiCircleCheck />
                        <p className="text-green-800">{order.status}</p>
                    </div>
                )}
                {order.status === "Cancelado" && (
                    <div className="flex items-center gap-2 bg-red-200 w-max px-2 rounded-full">
                        <CiCircleRemove />
                        <p className="text-red-800">{order.status}</p>
                    </div>
                )}
            </td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <Button
                        text={
                            <FaCheck className="bg-green-400 rounded-full p-1 h-5 w-5" />
                        }
                    />
                    <Button
                        text={
                            <FaTrash className="bg-red-400 rounded-full p-1 h-5 w-5" />
                        }
                    />
                    <Button
                        text={
                            <FaPen className="bg-orange-400 rounded-full p-1 h-5 w-5" />
                        }
                    />
                </div>
            </td>
        </tr>
    );
}
