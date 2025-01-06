import { Outlet, Navigate } from "react-router-dom";
import Header from "@/components/ui/Header";
import { ToastContainer, Bounce } from "react-toastify";

import { useAuth } from "@/hooks/useAuth";

export default function StoreLayout() {
    const { data, isError, isLoading } = useAuth();
    if (isLoading) return "Cargando...";
    if (isError) return <Navigate to="/auth" />;
    if (!data) return <Navigate to="/auth" />;
    if (data)
        return (
            <>
                <Header />
                <div className="md:py-28">
                    <Outlet />
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Bounce}
                />
            </>
        );
}
