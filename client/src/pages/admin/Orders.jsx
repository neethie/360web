import { TempOrders } from "../../data/orders";
import Order from "./components/panel/orders/Order";

export default function Orders() {
    return (
        <div className="space-y-6">
            <div className="">
                <h2 className="font-semibold text-3xl">Historial de Ordenes</h2>
                <p>12490 en total</p>
            </div>

            <table className="w-full p-2 border-spacing-y-12">
                <thead>
                    <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                        <th className="font-normal w-80">Cliente</th>
                        <th className="font-normal w-60">Fecha y Hora</th>
                        <th className="font-normal w-36">Total</th>
                        <th className="font-normal w-60">Estado</th>
                        <th className="font-normal text-center">Opciones</th>
                    </tr>
                </thead>

                <p>{}</p>

                <tbody className="">
                    {TempOrders.map((order) => (
                        <Order key={order.id} order={order} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
