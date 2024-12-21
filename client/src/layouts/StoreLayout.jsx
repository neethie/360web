import { Outlet } from "react-router-dom";
import Header from "../components/ui/layouts/store/Header";

export default function StoreLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
