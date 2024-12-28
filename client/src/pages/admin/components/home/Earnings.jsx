import { useQuery } from "@tanstack/react-query";
import { monthsString } from "../../../../utils/date";
import { OrdersAPI } from "../../../../services/ordersAPI";

export default function Earnings() {
    const date = new Date();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["getEarnings"],
        queryFn: OrdersAPI.getEarnings,
    });

    if (isLoading) return <div className="">Cargando...</div>;
    if (isError) return <div className="">Hubo un error</div>;
    if (!data) return <div className="">No se cargaron datos</div>;

    console.log(data);

    return (
        <div className="">
            <p className="text-sm">Mes de {monthsString[date.getMonth()]}</p>
            <p className="font-black text-2xl text-green-600">Q{data[0][""]}</p>
        </div>
    );
}
