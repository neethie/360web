import { Link } from "react-router-dom";
import { useAppStore } from "@/hooks/useAppStore";

export default function SelectRole() {
    const { setSelectRole } = useAppStore();

    const handleClick = () => {
        setSelectRole(false);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen absolute bg-black bg-opacity-80">
            <div className="bg-white z-20 p-8 space-y-4 rounded-3xl">
                <p className="text-lg font-semibold text-center">
                    Elige el rol a usar
                </p>
                <div className="flex justify-between gap-4">
                    <Link
                        to={"/"}
                        onClick={handleClick}
                        className="bg-blue-400 px-2 py-1 text-white rounded-3xl shadow-md opacity-80 hover:opacity-100"
                    >
                        Cliente
                    </Link>
                    <Link
                        onClick={handleClick}
                        to={"/admin"}
                        className="bg-blue-400 px-2 py-1 text-white rounded-3xl shadow-md opacity-80 hover:opacity-100"
                    >
                        Operador
                    </Link>
                </div>
            </div>
        </div>
    );
}
