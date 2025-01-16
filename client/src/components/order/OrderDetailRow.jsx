import ButtonOption from "@/components/ui/ButtonOption";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Edit } from "@/utils/constants";
import { OrdersAPI } from "../../services/ordersAPI";
import { useState } from "react";

export default function OrderDetailRow({ detail }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadDetail", detail.order_details_id],
        queryFn: () => OrdersAPI.getByDetailId(detail.order_details_id),
    });
    const temp = detail.quantity;
    const [cart, setCart] = useState(detail);

    if (isLoading) return;
    if (isError) return "Hubo un error";
    if (!data) return "Hubo un error";

    const { name, stock, price } = data;

    const handleButton = (type) => {
        switch (type) {
            case Edit.Types.plus: {
                if (stock + temp - cart.quantity === 0) {
                    toast.error(
                        `El producto ${name} no tiene suficiente stock`
                    );
                    break;
                }
                setCart({
                    ...cart,
                    quantity: cart.quantity + 1,
                    subtotal: (cart.quantity + 1) * price,
                });
                break;
            }
            case Edit.Types.minus: {
                if (cart.quantity === 0) {
                    toast.error(`Llegaste al limite`);
                    break;
                }
                setCart({
                    ...cart,
                    quantity: cart.quantity - 1,
                    subtotal: (cart.quantity - 1) * price,
                });
                break;
            }
            case Edit.Types.cancel: {
                alert("Acción imposible actualmente.");
                break;
            }
        }
    };

    return (
        <tr className="font-semibold text-base h-12">
            <td>{cart.name}</td>
            <td>{cart.quantity}</td>
            <td>Q{cart.subtotal}</td>
            <td>
                <div className="flex flex-row gap-2 justify-center items-center text-white">
                    <ButtonOption
                        option={Edit.Types.plus}
                        label={"Agregar"}
                        handleClick={() => handleButton(Edit.Types.plus)}
                    />
                    <ButtonOption
                        option={Edit.Types.cancel}
                        label={"Eliminar"}
                        handleClick={() => handleButton(Edit.Types.cancel)}
                    />
                    <ButtonOption
                        option={Edit.Types.minus}
                        label={"Quitar"}
                        handleClick={() => handleButton(Edit.Types.minus)}
                    />
                </div>
            </td>
        </tr>
    );
}
