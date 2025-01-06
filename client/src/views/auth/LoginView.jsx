import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/ui/Logo";

import { useAppStore } from "@/hooks/useAppStore";
import SelectRole from "../../components/auth/SelectRole";

export default function LoginView() {
    const { setAuthForm, selectRole } = useAppStore();

    const handleClick = () => {
        setAuthForm(1);
    };

    return (
        <>
            {selectRole && (
                <>
                    <div className="bg-black opacity-60 z-10 h-screen w-screen absolute" />
                    <SelectRole />
                </>
            )}
            <div className="grid grid-cols-[3fr_2fr] h-screen">
                <div className="bg-white p-8 rounded-xl flex justify-center flex-col items-center">
                    <div className="bg-white p-8 rounded-xl flex justify-center flex-col items-center">
                        <Logo to="/auth" />
                        <h3 className="font-semibold text-3xl text-center">
                            Iniciar{" "}
                            <span className="text-blue-400">Sesión</span>
                        </h3>
                        <p className="text-gray-500 text-center">
                            Ingresa tus credenciales para ingresar en tu cuenta
                        </p>
                    </div>
                    <LoginForm />
                </div>
                <div className="bg-blue-400 opacity-80 p-4 rounded-tl-3xl rounded-bl-3xl text-white flex flex-col items-center justify-center w-full">
                    <p className="font-semibold text-xl">¿No tienes cuenta?</p>
                    <p className="text-sm font-semibold">
                        <button
                            onClick={handleClick}
                            className="hover:text-blue-900 transition-all"
                        >
                            Click aqui
                        </button>{" "}
                        para registrarte
                    </p>
                </div>
            </div>
        </>
    );
}
