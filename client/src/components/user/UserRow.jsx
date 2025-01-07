import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Edit } from "@/utils/constants";
import ButtonOption from "@/components/ui/ButtonOption";
import { convertDate } from "@/utils/date";
import { UsersAPI } from "../../services/usersAPI";

export default function UserRow({ user }) {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: UsersAPI.updateStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("users");
            toast.success(
                `Has ${
                    !user.is_disabled ? "deshabilitado" : "habilitado"
                } un usuario`
            );
        },
    });
    const handleDisable = () => {
        const data = { user_id: user.user_id, is_disabled: !user.is_disabled };
        mutate(data);
    };

    return (
        <tr className="font-semibold text-base h-12">
            <td>{user.full_name}</td>
            <td>{user.email}</td>
            <td>{convertDate(user.date_creation)}</td>
            <td>
                <div className="flex flex-row gap-2 justify-center text-white">
                    {user.is_disabled ? (
                        <ButtonOption
                            option={Edit.Types.accept}
                            handleClick={handleDisable}
                            label={"Habilitar"}
                        />
                    ) : (
                        <ButtonOption
                            option={Edit.Types.cancel}
                            handleClick={handleDisable}
                            label={"Deshabilitar"}
                        />
                    )}
                    <Link to={`edit/${user.user_id}`}>
                        <ButtonOption option={Edit.Types.edit} label="Editar" />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
