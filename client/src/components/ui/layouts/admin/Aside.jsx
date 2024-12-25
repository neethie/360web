import { useState } from "react";
import { NavLink } from "react-router-dom";

import { RiHome4Line } from "react-icons/ri";
import { MdOutlineShoppingBag, MdOutlineSettings } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Logo from "../../utils/Logo";
import { useAppStore } from "../../../../store/UseAppStore";

export default function Aside() {
    const [buttonStore, setButtonStore] = useState(false);
    const { mobileAdmin, setMobileAdmin } = useAppStore();

    const handleButtonStore = () => {
        setButtonStore(!buttonStore);
    };

    const handleClick = () => {
        setMobileAdmin(false);
    };

    if (mobileAdmin) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <aside
            className={`${
                mobileAdmin ? "w-screen" : "hidden"
            } md:w-[200px] text-gray-600 min-h-screen py-4 fixed top-0 left-0 md:flex flex-col border-r-2 bg-white`}
        >
            <Logo />

            <nav className="my-4 space-y-2 uppercase font-semibold text-xs px-2">
                <NavLink
                    to="/admin"
                    onClick={handleClick}
                    className={
                        "flex items-center gap-2 py-2 px-4 transition-all w-full hover:text-black hover:translate-x-1 "
                    }
                >
                    <RiHome4Line className="w-4 h-4" />
                    <p>Inicio</p>
                </NavLink>
                <button
                    onClick={handleButtonStore}
                    className=" flex items-center justify-between gap-2 hover:text-black hover:translate-x-1 py-2 px-4 transition-all w-full"
                >
                    <div className="flex gap-2 items-center uppercase">
                        <MdOutlineShoppingBag className="w-4 h-4" />
                        <p>Tienda</p>
                    </div>
                    {!buttonStore ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </button>
                {buttonStore && (
                    <div className="flex flex-row h-max transition-all pl-5 gap-2">
                        <div className="min-h-full w-[0.1rem] bg-gray-400"></div>
                        <div className="w-full flex flex-col ">
                            <NavLink
                                to={"/admin/products"}
                                onClick={handleClick}
                                className={({ isActive }) =>
                                    "flex items-center gap-2 py-2 px-4 transition-all w-full rounded-full " +
                                    (isActive
                                        ? "bg-black text-white"
                                        : "hover:text-black hover:translate-x-1")
                                }
                            >
                                Productos
                            </NavLink>
                            <NavLink
                                to={"/admin/orders"}
                                onClick={handleClick}
                                className={({ isActive }) =>
                                    "flex items-center gap-2 py-2 px-4 transition-all w-full rounded-full " +
                                    (isActive
                                        ? "bg-black text-white"
                                        : "hover:text-black hover:translate-x-1")
                                }
                            >
                                Ordenes
                            </NavLink>
                            <NavLink
                                to={"/admin/categories"}
                                onClick={handleClick}
                                className={({ isActive }) =>
                                    "flex items-center gap-2 py-2 px-4 transition-all w-full rounded-full " +
                                    (isActive
                                        ? "bg-black text-white"
                                        : "hover:text-black hover:translate-x-1")
                                }
                            >
                                Categorias
                            </NavLink>
                        </div>
                    </div>
                )}
                <NavLink
                    to={"/admin/users"}
                    onClick={handleClick}
                    className={({ isActive }) =>
                        "flex items-center gap-2 py-2 px-4 transition-all w-full rounded-full " +
                        (isActive
                            ? "bg-black text-white"
                            : "hover:text-black hover:translate-x-1")
                    }
                >
                    <FiUsers className="w-4 h-4" />
                    <p>Usuarios</p>
                </NavLink>
                <button
                    onClick={handleClick}
                    className=" flex items-center gap-2  py-2 px-4 transition-all w-full uppercase hover:translate-x-1"
                >
                    <MdOutlineSettings className="w-4 h-4" />
                    <p>Ajustes</p>
                </button>
            </nav>
        </aside>
    );
}
