import ButtonOption from "../../../../../components/ui/utils/ButtonOption";

import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

import { EditType } from "../../../../../utils/constants";

import { Link } from "react-router-dom";

export default function Category({ category }) {
    return (
        <tr className="font-semibold text-base h-12">
            <td>{category.name}</td>
            <td>
                <div
                    className={`flex items-center gap-2 w-max px-2 rounded-full ${
                        category.is_disabled
                            ? "bg-red-200 text-red-800}"
                            : "bg-green-200 text-green-800"
                    }`}
                >
                    {category.is_disabled ? (
                        <>
                            <CiCircleRemove />
                            <p>Deshabilitada</p>
                        </>
                    ) : (
                        <>
                            <CiCircleCheck />
                            <p>Habilitada</p>
                        </>
                    )}
                </div>
            </td>
            <td>-</td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <Link to={`delete/${category.category_id}`}>
                        <ButtonOption option={EditType.Reject.type} />
                    </Link>
                    <Link to={`edit/${category.category_id}`}>
                        <ButtonOption option={EditType.Edit.type} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
