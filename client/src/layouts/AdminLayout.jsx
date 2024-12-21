import { Outlet } from "react-router-dom";
import Aside from "../components/ui/layouts/admin/Aside";
import Overlay from "../components/ui/utils/Overlay";

import { useAppStore } from "../store/UseAppStore";
import ProductPanel from "../pages/admin/components/panel/ProductPanel";

export default function AdminLayout() {
    const { panelModal } = useAppStore();

    if (panelModal) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <>
            <div className="grid grid-cols-[auto_1fr]">
                <Aside />

                <div className="p-6 space-y-2 bg-white">
                    <Outlet />
                </div>
            </div>
            {panelModal && (
                <>
                    <Overlay />
                    <ProductPanel />
                </>
            )}
        </>
    );
}
