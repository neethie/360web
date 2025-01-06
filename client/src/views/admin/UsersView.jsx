import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { UsersAPI } from "@/services/usersAPI";

import UserRow from "@/components/user/UserRow";
import Button from "@/components/ui/Button";

export default function Users() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: UsersAPI.getAll,
    });

    if (isLoading) return <div className="">Cargando...</div>;
    if (isError) return <div className="">Error: {error.message}</div>;
    if (!data) return <div className="">No hay datos disponibles</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-3xl">
                        Todos los usuarios
                    </h2>
                    <p>{data.length} en total</p>
                </div>
                <Link to={"create"}>
                    <Button text={"Crear"} classname={"bg-blue-600"} />
                </Link>
            </div>
            <table className="w-full p-2 border-spacing-y-12">
                <thead>
                    <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                        <th className="font-normal w-64">Nombre</th>
                        <th className="font-normal w-64">Correo</th>
                        <th className="font-normal w-48">Fecha registrado</th>
                        <th className="font-normal text-center w-48">
                            Opciones
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {data.map((user) => (
                        <UserRow user={user} key={user.user_id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
