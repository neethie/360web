import ButtonOption from "../../../../../components/ui/utils/ButtonOption";

import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

import { Link } from "react-router-dom";

export default function Category({ category }) {
    const getStatus = () => {
        switch (category.is_disabled) {
            case false: {
                return (
                    <div className="flex items-center gap-2 w-max px-2 rounded-full bg-green-200 text-green-800">
                        <CiCircleCheck />
                        <p>Habilitada</p>
                    </div>
                );
            }
            case true: {
                return (
                    <div className="flex items-center gap-2 w-max px-2 rounded-full bg-red-200 text-red-800">
                        <CiCircleRemove />
                        <p>Deshabilitada</p>
                    </div>
                );
            }
        }
    };
    return (
        <tr className="font-semibold text-base h-12">
            <td>{category.name}</td>
            <td>{getStatus}</td>
            <td>-</td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <ButtonOption option={2} />
                    <Link to={`edit/${category.category_id}`}>
                        <ButtonOption option={3} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
