import { EditType } from "../../../../../utils/constants";
import ButtonOption from "../../../../../components/ui/utils/ButtonOption";
import { convertDate } from "../../../../../utils/date";

import { Link } from "react-router-dom";

export default function User({ user }) {
    return (
        <tr className="font-semibold text-base h-12">
            <td>{user.full_name}</td>
            <td>{user.email}</td>
            <td>{convertDate(user.date_creation)}</td>
            <td className="">
                <div className="flex flex-row gap-2 justify-center text-white">
                    <Link to={`delete/${user.user_id}`}>
                        <ButtonOption option={EditType.Reject.type} />
                    </Link>
                    <Link to={`edit/${user.user_id}`}>
                        <ButtonOption option={EditType.Edit.type} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
