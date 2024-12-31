import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ui } from "@/utils/ui";

import { useAuth } from "@/hooks/useAuth";

import { CategoriesAPI } from "@/services/categoriesApi";

import { IoIosMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import Logo from "./Logo";

export default function Header() {
    const [isHovered, setIsHovered] = useState(false);
    const handleEnter = () => setIsHovered(true);
    const handleExit = () => setIsHovered(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadCategories"],
        queryFn: CategoriesAPI.getAll,
    });

    const queryClient = useQueryClient();
    const logout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        queryClient.invalidateQueries({ queryKey: ["user"] });
    };

    const { data: authData } = useAuth();
    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data) return "No hay categorias";

    return (
        <header className="flex justify-between px-6 py-4 items-center md:fixed bg-white md:w-screen shadow-lg z-50 h-20">
            {ui.isMobile() ? (
                <>
                    <button>
                        <IoIosMenu />
                    </button>
                    <button>
                        <CiShoppingCart className="w-5 h-5" />
                    </button>
                    <button>
                        <CiUser className="w-5 h-5" />
                    </button>
                    <button>
                        <CiSearch className="w-5 h-5" />
                    </button>
                </>
            ) : (
                <>
                    <Logo to={"/"} />
                    <nav className="flex items-center gap-4 font-semibold text-xs">
                        <ul>
                            <Link to={"/"} className="uppercase px-2 py-1 ">
                                <p>Inicio</p>
                            </Link>
                        </ul>
                        <ul>
                            <Popover
                                className="relative"
                                onMouseEnter={handleEnter}
                                onMouseLeave={handleExit}
                            >
                                <Link
                                    to={"/search"}
                                    className="uppercase px-2 py-1 flex items-center gap-2 "
                                >
                                    <p>Tienda</p>
                                    {!isHovered ? (
                                        <IoIosArrowDown />
                                    ) : (
                                        <>
                                            <IoIosArrowUp />
                                            <PopoverPanel
                                                static
                                                className="absolute left-0 mt-2 bg-white shadow-lg rounded-md p-2 z-10"
                                                style={{ top: "100%" }}
                                            >
                                                <div className="flex flex-col">
                                                    {data.map((category) => (
                                                        <Link
                                                            to={"/search"}
                                                            key={
                                                                category.category_id
                                                            }
                                                            className="px-4 py-2 hover:bg-gray-100 rounded-md"
                                                            onClick={() =>
                                                                handleExit()
                                                            }
                                                        >
                                                            {category.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </PopoverPanel>
                                        </>
                                    )}
                                </Link>
                            </Popover>
                        </ul>
                        <ul>
                            <Link
                                to={"/contact"}
                                className="uppercase px-2 py-1 "
                            >
                                <p>Contacto</p>
                            </Link>
                        </ul>
                    </nav>
                    <div className="flex gap-2 relative">
                        <form className="">
                            <div className="bg-gray-100 flex items-center rounded-full px-2">
                                <label
                                    htmlFor="Buscar"
                                    className="text-gray-500"
                                >
                                    <CiSearch />
                                </label>
                                <input
                                    type="text"
                                    name="Buscar"
                                    id="Buscar"
                                    placeholder="Buscar"
                                    className="px-2 text-sm py-1 bg-gray-100 placeholder:text-gray-500 focus:outline-none"
                                />
                            </div>
                        </form>
                        <button>
                            <CiShoppingCart className="w-5 h-5" />
                        </button>
                        <Popover className="relative flex items-center font-semibold text-xs">
                            <PopoverButton>
                                <CiUser className="w-5 h-5" />
                            </PopoverButton>
                            <PopoverPanel
                                className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 z-10 w-max flex flex-col gap-1"
                                style={{ top: "100%" }}
                            >
                                <Link
                                    to={"/account"}
                                    className="px-4 py-2 hover:bg-gray-100 rounded-md"
                                >
                                    Mi cuenta
                                </Link>
                                {authData.rol_id !== 1 && (
                                    <Link
                                        to={"/admin"}
                                        className="px-4 py-2 hover:bg-gray-100 rounded-md"
                                    >
                                        Administrador
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 hover:bg-red-400 rounded-md bg-red-300 text-white"
                                >
                                    Cerrar Sesión
                                </button>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </>
            )}
        </header>
    );
}
