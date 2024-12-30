import { Link } from "react-router-dom";

import { Edit } from "@/utils/constants";
import ButtonOption from "@/components/ui/ButtonOption";
import { convertDate } from "@/utils/date";

export default function UserRow({ user }) {
    return (
        <tr className="font-semibold text-base h-12">
            <td>{user.full_name}</td>
            <td>{user.email}</td>
            <td>{convertDate(user.date_creation)}</td>
            <td>
                <div className="flex flex-row gap-2 justify-center text-white">
                    <Link to={`delete/${user.user_id}`}>
                        <ButtonOption option={Edit.Types.cancel} />
                    </Link>
                    <Link to={`edit/${user.user_id}`}>
                        <ButtonOption option={Edit.Types.edit} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
