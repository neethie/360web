import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import PanelCart from "@/components/cart/PanelCart";
import Button from "@/components/ui/Button";
import { useAppStore } from "@/hooks/useAppStore";
import { useAuth } from "@/hooks/useAuth";
import { UsersAPI } from "../../services/usersAPI";
import { OrdersAPI } from "../../services/ordersAPI";

export default function CartView() {
    const { cart, resetCart } = useAppStore();

    const { data: authData } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadUser", authData.user_id],
        queryFn: () => UsersAPI.getById(authData.user_id),
    });

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: OrdersAPI.create,
        onSuccess: (data) => {
            toast.success("Has creado una orden");
            resetCart();
            navigate(`/order/${data[0].order_id}`);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleCreate = () => {
        mutate(cart);
    };

    if (isLoading) return "Cargando...";
    if (isError) return "Error";

    return (
        <>
            <div className="flex justify-center w-screen relative">
                <div className="bg-blue-400 h-40 w-full absolute"></div>
                <div className="grid grid-cols-[2fr_1fr] gap-2 mt-10">
                    <div className="p-10 bg-white z-10 shadow-xl border">
                        <h3 className="text-3xl font-semibold">Mi Carrito</h3>
                        <p>Revisa que tu orden esté completa</p>

                        <PanelCart checkout />
                    </div>
                    <div className="p-10 bg-white z-10 shadow-xl border">
                        <h3 className="text-3xl font-semibold">Facturación</h3>
                        <p>
                            Puedes modificar esto en{" "}
                            <Link to="/account" className="underline">
                                tu cuenta
                            </Link>
                            <div className="my-4">
                                <p className="font-semibold">
                                    Nombre:{" "}
                                    <span className="font-normal">
                                        {data[0].full_name}
                                    </span>
                                </p>
                                <p className="font-semibold">
                                    Teléfono:{" "}
                                    <span className="font-normal">
                                        {data[0].phone}
                                    </span>
                                </p>
                                <p className="font-semibold">
                                    Dirección:{" "}
                                    <span className="font-normal">
                                        {data[0].address}
                                    </span>
                                </p>
                            </div>
                            <Button
                                text={"Confirmar pedido"}
                                classname={"bg-green-400 w-full"}
                                handle={handleCreate}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
