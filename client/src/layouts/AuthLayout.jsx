import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { useAppStore } from "../store/UseAppStore";

import Logo from "../components/ui/utils/Logo";

export default function AuthLayout() {
    const { authForm } = useAppStore();

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100 flex-col gap-5">
                <Logo />
                <div className="flex bg-white rounded-xl">
                    {authForm === 0 ? <Login /> : <Register />}
                </div>
            </div>
        </>
    );
}
