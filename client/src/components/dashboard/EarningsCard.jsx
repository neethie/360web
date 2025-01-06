import { useQuery } from "@tanstack/react-query";
import { monthsString } from "@/utils/date";
import { OrdersAPI } from "@/services/ordersAPI";

export default function EarningsCard() {
    const date = new Date();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["getEarnings"],
        queryFn: OrdersAPI.getEarnings,
    });

    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data) return "No hay datos";

    return (
        <div className="">
            <p className="text-sm">
                Mes de {monthsString[date.getMonth()]}, {date.getFullYear()}
            </p>
            <p className="font-black text-2xl text-green-600">
                Q{data[0][""] ? data[0][""] : "0.00"}
            </p>
        </div>
    );
}
