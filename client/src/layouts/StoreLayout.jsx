import { Outlet } from "react-router-dom";
import Header from "@/components/ui/Header";

export default function StoreLayout() {
    return (
        <>
            <Header />
            <div className="md:py-28">
                <Outlet />
            </div>
        </>
    );
}
