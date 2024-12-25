import { Outlet } from "react-router-dom";

import Aside from "../components/ui/layouts/admin/Aside";

import { useAppStore } from "../store/UseAppStore";

import { IoIosMenu } from "react-icons/io";
import { isMobile } from "../utils/mobile";

export default function AdminLayout() {
    const { panelModal, mobileAdmin, setMobileAdmin } = useAppStore();

    if (panelModal) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    const handleClick = () => {
        setMobileAdmin(!mobileAdmin);
    };

    return (
        <>
            <div className="grid md:grid-cols-[200px_1fr]">
                <Aside />
                {isMobile() && (
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
