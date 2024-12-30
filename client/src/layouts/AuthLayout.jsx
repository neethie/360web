import { useAppStore } from "@/hooks/useAppStore";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function AuthLayout() {
    const { authForm } = useAppStore();

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100 flex-col gap-5">
                <div className="flex bg-white rounded-xl shadow-lg">
                    {authForm === 0 ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
        </>
    );
}
