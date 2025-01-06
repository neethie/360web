import { useAppStore } from "@/hooks/useAppStore";

import { ToastContainer, Bounce } from "react-toastify";

import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";

export default function AuthLayout() {
    const { authForm } = useAppStore();

    return (
        <>
            <div className="">
                {authForm === 0 ? <LoginView /> : <RegisterView />}
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
