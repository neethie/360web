import { useAppStore } from "@/hooks/useAppStore";
import UserAccountView from "./user/UserAccountView";
import UserOrdersView from "./user/UserOrdersView";

import { useAuth } from "@/hooks/useAuth";

export default function AccountView() {
    const { accountView, setAccountView } = useAppStore();

    const { data: userData } = useAuth();

    const handleClick = () => {
        setAccountView(!accountView);
    };

    return (
        <>
            <div className="flex justify-center w-screen relative">
                <div className="bg-blue-400 h-40 w-full"></div>
                <div className="p-10 bg-white w-3/5 absolute top-10 z-10 shadow-xl border">
                    <h3 className="text-3xl font-semibold">Mi Cuenta</h3>
                    <nav className="flex flex-row gap-4 font-semibold mt-2">
                        <ul>
                            <button
                                onClick={handleClick}
                                className={`${accountView && "text-gray-400"}`}
                            >
                                Mi información
                            </button>
                        </ul>
                        <ul>
                            <button
                                onClick={handleClick}
                                className={`${!accountView && "text-gray-400"}`}
                            >
                                Mis órdenes
                            </button>
                        </ul>
                    </nav>
                    {!accountView ? (
                        <UserAccountView user={userData} />
                    ) : (
                        <UserOrdersView user={userData} />
                    )}
                </div>
            </div>
        </>
    );
}
