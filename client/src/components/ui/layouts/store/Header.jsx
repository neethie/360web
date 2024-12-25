import Logo from "../../utils/Logo";

import { IoIosMenu } from "react-icons/io";

import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import { isMobile } from "../../../../utils/mobile";
import { useState } from "react";

export default function Header() {
    const [buttonStore, setButtonStore] = useState(false);

    const handleMouse = () => {
        setButtonStore(!buttonStore);
    };

    return (
        <header className="flex justify-between px-2 py-4 items-center mx-4">
            {isMobile() ? (
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
                    <Logo />
                    <nav className="flex items-center gap-4 font-semibold text-xs">
                        <ul>
                            <button className="uppercase hover:bg-black hover:text-white px-2 py-1 transition-all">
                                <p>Inicio</p>
                            </button>
                        </ul>
                        <ul>
                            <button
                                onMouseEnter={handleMouse}
                                onMouseLeave={handleMouse}
                                className="uppercase hover:bg-black hover:text-white px-2 py-1 transition-all flex items-center gap-2"
                            >
                                <p>Tienda</p>
                                {!buttonStore ? (
                                    <IoIosArrowDown />
                                ) : (
                                    <IoIosArrowUp />
                                )}
                            </button>
                        </ul>
                        <ul>
                            <button className="uppercase hover:bg-black hover:text-white px-2 py-1 transition-all">
                                <p>Contáctanos</p>
                            </button>
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
