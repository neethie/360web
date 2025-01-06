import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import SearchBar from "./SearchBar";
import ProductCartCard from "../cart/ProductCartCard";
import { useAppStore } from "../../hooks/useAppStore";

export default function Header() {
    const [isHovered, setIsHovered] = useState(false);
    const handleEnter = () => setIsHovered(true);
    const handleExit = () => setIsHovered(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadCategories"],
        queryFn: CategoriesAPI.getAll,
    });

    const { data: authData } = useAuth();

    const { cart } = useAppStore();

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        queryClient.resetQueries(["user"]);
        navigate("/auth");
    };

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
                    <Popover className="relative flex items-center font-semibold text-xs">
                        <PopoverButton>
                            <CiShoppingCart className="w-5 h-5" />
                        </PopoverButton>
                        <PopoverPanel
                            className="absolute -left-12 mt-2 bg-white shadow-lg rounded-md p-2 z-10 w-max flex flex-col gap-1"
                            style={{ top: "100%" }}
                        >
                            <div className="">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <p>Producto</p>
                                            </th>
                                            <th>
                                                <p>Cantidad</p>
                                            </th>
                                            <th>
                                                <p>Subtotal</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ProductCartCard />
                                    </tbody>
                                </table>
                            </div>
                            <Link
                                to={"/cart"}
                                className="px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-center text-white"
                            >
                                Checkout
                            </Link>
                        </PopoverPanel>
                    </Popover>
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
                        <SearchBar />
                        <Popover className="relative flex items-center font-semibold text-xs">
                            <PopoverButton>
                                <CiShoppingCart className="w-5 h-5" />
                            </PopoverButton>
                            <PopoverPanel
                                className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 z-10 w-max flex flex-col gap-1"
                                style={{ top: "100%" }}
                            >
                                {cart.length ? (
                                    <>
                                        <div className="">
                                            <table className="w-full table-auto border-separate border-spacing-y-2">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th className="w-48">
                                                            Producto
                                                        </th>
                                                        <th className="w-24">
                                                            Cantidad
                                                        </th>
                                                        <th className="w-24">
                                                            Subtotal
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <>
                                                        {cart.map((item) => (
                                                            <ProductCartCard
                                                                key={
                                                                    item.product_id
                                                                }
                                                                productCart={
                                                                    item
                                                                }
                                                            />
                                                        ))}
                                                    </>
                                                </tbody>
                                            </table>
                                        </div>

                                        <Link
                                            to={"/cart"}
                                            className="px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded-md text-center text-white"
                                        >
                                            Checkout
                                        </Link>
                                    </>
                                ) : (
                                    <p>No hay productos en el carrito</p>
                                )}
                            </PopoverPanel>
                        </Popover>
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
                                    type="button"
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
