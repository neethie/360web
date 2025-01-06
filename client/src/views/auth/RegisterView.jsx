import RegisterForm from "@/components/auth/RegisterForm";
import { useAppStore } from "@/hooks/useAppStore";

export default function RegisterView() {
    const { setAuthForm } = useAppStore();

    const handleClick = () => {
        setAuthForm(0);
    };

    return (
        <div className="grid grid-cols-[2fr_3fr] h-screen">
            <div className="bg-blue-400 opacity-80 p-4 rounded-tr-3xl rounded-br-3xl text-white flex flex-col items-center justify-center">
                <p className="font-semibold text-xl">¿Ya tienes cuenta?</p>
                <p className="text-sm font-semibold">
                    <button
                        onClick={handleClick}
                        className="hover:text-blue-900 transition-all"
                    >
                        Click aqui
                    </button>{" "}
                    para iniciar sesión
                </p>
            </div>
            <RegisterForm />
        </div>
    );
}
