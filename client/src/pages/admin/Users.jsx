import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../services/usersAPI";
import User from "./components/panel/users/User";

export default function Users() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    if (isLoading) return <div className="">Cargando...</div>;
    if (isError) return <div className="">Error: {error.message}</div>;
    if (!data) return <div className="">No hay datos disponibles</div>;

    return (
        <div className="space-y-6">
            <div className="">
                <h2 className="font-semibold text-3xl">Todos los usuarios</h2>
                <p>{data.length} en total</p>
            </div>
            <table className="w-full p-2 border-spacing-y-12">
                <thead>
                    <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                        <th className="font-normal w-80">Nombre</th>
                        <th className="font-normal w-60">Correo</th>
                        <th className="font-normal w-36">Fecha registrado</th>
                        <th className="font-normal text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody className="">
                    {data.map((user) => (
                        <User user={user} key={user.user_id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
