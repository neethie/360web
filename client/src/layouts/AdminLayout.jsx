import { Outlet } from "react-router-dom";

import AdminAside from "@/components/ui/AdminAside";
import { IoIosMenu } from "react-icons/io";

import { ui } from "@/utils/ui";
import { useAppStore } from "@/hooks/useAppStore";

export default function AdminLayout() {
    const { setMobileMenu, mobileMenu } = useAppStore();
    const handleClick = () => {
        setMobileMenu(!mobileMenu);
    };

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
        </>
    );
}
