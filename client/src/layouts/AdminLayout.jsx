import { Outlet, Navigate } from "react-router-dom";

import AdminAside from "@/components/ui/AdminAside";
import { ToastContainer, Bounce } from "react-toastify";
import { IoIosMenu } from "react-icons/io";

import { ui } from "@/utils/ui";
import { useAppStore } from "@/hooks/useAppStore";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout() {
    const { setMobileMenu, mobileMenu } = useAppStore();
    const handleClick = () => {
        setMobileMenu(!mobileMenu);
    };

    const { data, isError, isLoading } = useAuth();
    if (isLoading) return "Cargando...";
    if (isError) return <Navigate to="/" />;
    if (!data) return <Navigate to="/auth" />;
    if (data.rol_id === 1) return <Navigate to="/" />;

    return (
        <>
            <div className="grid md:grid-cols-[200px_1fr]">
                <AdminAside />
                {ui.isMobile() && (
                    <div className="flex items-center justify-center py-2 translate-y-4">
                        <button onClick={handleClick}>
                            <IoIosMenu className="w-8 h-8" />
                        </button>
                    </div>
                )}

                <div className="p-6 space-y-2 bg-white col-start-2">
                    <Outlet />
                </div>
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
