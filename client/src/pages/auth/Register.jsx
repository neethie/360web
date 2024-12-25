import { useAppStore } from "../../store/UseAppStore";

export default function Register() {
    const { setAuthForm } = useAppStore();

    const handleClick = () => {
        setAuthForm(0);
    };
    return (
        <>
            <div className="bg-blue-400 opacity-80 p-4 rounded-xl text-white flex flex-col items-center justify-center">
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
            <div className="bg-white p-8 rounded-xl">
                <h3 className="font-semibold text-3xl text-center">
                    ¡Bienvenido por primera vez!
                </h3>
                <p className="text-gray-500 text-center">
                    Ingresa unas credenciales para crear una cuenta
                </p>

                <form action="" className="my-2 space-y-4">
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Ingresa tu email"
                            className="border py-2 px-4 w-full rounded-xl"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="border py-2 px-4 w-full rounded-xl"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Registrarse"
                        className="border py-2 px-4 w-full rounded-xl bg-blue-400 text-white opacity-80 hover:opacity-100 cursor-pointer"
                    />
                </form>
            </div>
        </>
    );
}
