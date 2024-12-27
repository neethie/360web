import { EditType } from "../../../../../utils/constants";
import ButtonOption from "../../../../../components/ui/utils/ButtonOption";
import { convertDate } from "../../../../../utils/date";

export default function User({ user }) {
    return (
        <tr className="font-semibold text-base h-12">
            <td>{user.full_name}</td>
            <td>{user.email}</td>
            <td>{convertDate(user.date_creation)}</td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <ButtonOption option={EditType.Reject.type} />
                    <ButtonOption option={EditType.Edit.type} />
                </div>
            </td>
        </tr>
    );
}
