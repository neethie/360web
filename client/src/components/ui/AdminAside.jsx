import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { RiHome4Line } from "react-icons/ri";
import { MdOutlineShoppingBag, MdOutlineSettings } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiArrowShuffle } from "react-icons/ti";

import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

import { useAppStore } from "@/hooks/useAppStore";

export default function AdminAside() {
    const { setMobileMenu, mobileMenu } = useAppStore();
    const handleMobileMenu = () => {
        setMobileMenu(false);
    };
    if (mobileMenu) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }

    const [buttonShop, setButtonShop] = useState(false);
    const handleButtonShop = () => {
        setButtonShop(!buttonShop);
    };

    const queryClient = useQueryClient();

    const handleLogOut = () => {
        localStorage.removeItem("AUTH_TOKEN");
        queryClient.setQueryData(["user"], null);
        queryClient.invalidateQueries(["user"]);
    };
    return (
        <aside
            className={`${
                mobileMenu ? "w-screen" : "hidden"
            } md:w-[200px] text-gray-600 min-h-screen py-4 fixed top-0 left-0 md:flex flex-col border-r-2 bg-white justify-between`}
        >
            <div className="">
                <div className="flex justify-center w-full">
                    <Logo to={"/admin"} />
                </div>
                <nav className="my-4 space-y-2 uppercase font-semibold text-xs px-2">
                    <NavLink
                        to="/admin"
                        onClick={handleMobileMenu}
                        className={
                            "flex items-center gap-2 py-2 px-4 transition-all w-full hover:text-black hover:translate-x-1 "
                        }
                    >
                        <RiHome4Line className="w-4 h-4" />
                        <p>Inicio</p>
                    </NavLink>
                    <button
                        onClick={handleButtonShop}
                        className=" flex items-center justify-between gap-2 hover:text-black hover:translate-x-1 py-2 px-4 transition-all w-full"
                    >
                        <div className="flex gap-2 items-center uppercase">
                            <MdOutlineShoppingBag className="w-4 h-4" />
                            <p>Tienda</p>
                        </div>
                        {!buttonShop ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </button>
                    {buttonShop && (
                        <div className="flex flex-row h-max transition-all pl-5 gap-2">
                            <div className="min-h-full w-[0.1rem] bg-gray-400"></div>
                            <div className="w-full flex flex-col ">
                                <NavLink
                                    to={"/admin/products"}
                                    onClick={handleMobileMenu}
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
                                    onClick={handleMobileMenu}
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
                                    onClick={handleMobileMenu}
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
                        onClick={handleMobileMenu}
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
                    <Link
                        to="config"
                        onClick={handleMobileMenu}
                        className=" flex items-center gap-2  py-2 px-4 transition-all w-full uppercase hover:translate-x-1"
                    >
                        <MdOutlineSettings className="w-4 h-4" />
                        <p>Ajustes</p>
                    </Link>
                    <Link
                        to="/"
                        className=" flex items-center gap-2  py-2 px-4 transition-all w-full uppercase hover:translate-x-1"
                    >
                        <TiArrowShuffle className="w-4 h-4" />
                        <p>Ir a la tienda</p>
                    </Link>
                </nav>
            </div>
            <div className=" flex justify-center w-full px-2">
                <Button
                    text={"Cerrar sesión"}
                    classname="bg-red-400 w-full"
                    handle={handleLogOut}
                ></Button>
            </div>
        </aside>
    );
}
