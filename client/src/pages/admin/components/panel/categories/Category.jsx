import ButtonOption from "../../../../../components/ui/utils/ButtonOption";

import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

export default function Category({ category }) {
    const getStatus = () => {
        switch (category.status) {
            case 1: {
                return (
                    <div className="flex items-center gap-2 w-max px-2 rounded-full bg-green-200 text-green-800">
                        <CiCircleCheck />
                        <p>Habilitada</p>
                    </div>
                );
            }
            case 0: {
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
        <tr key={category.category_id} className="font-semibold text-base h-12">
            <td>{category.name}</td>
            <td>{getStatus()}</td>
            <td>-</td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <ButtonOption option={2} />
                    <ButtonOption option={3} />
                </div>
            </td>
        </tr>
    );
}
