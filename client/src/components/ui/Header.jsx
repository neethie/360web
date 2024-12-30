import { useState } from "react";
import { Link } from "react-router-dom";

import { ui } from "@/utils/ui";

import { IoIosMenu } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Logo from "./Logo";

export default function Header() {
    const [buttonStore, setButtonStore] = useState(false);

    const handleMouse = () => {
        setButtonStore(!buttonStore);
    };

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
                            <Link
                                to={"/search"}
                                className="uppercase px-2 py-1 flex items-center gap-2 "
                                onMouseEnter={handleMouse}
                                onMouseLeave={handleMouse}
                            >
                                <p>Tienda</p>
                                {!buttonStore ? (
                                    <IoIosArrowDown />
                                ) : (
                                    <>
                                        <IoIosArrowUp />
                                        <nav className="absolute top-12 bg-white p-2 space-y-1"></nav>
                                    </>
                                )}
                            </Link>
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
                        <button>
                            <CiUser className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}
        </header>
    );
}
