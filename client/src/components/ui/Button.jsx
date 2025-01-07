import { useState } from "react";
import Info from "./Info";

export default function Button({ text, handle, classname, label }) {
    const handleClick = () => {
        if (handle) handle();
    };

    const [info, setInfo] = useState(false);

    const handleMouse = () => {
        setInfo(!info);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                onMouseEnter={handleMouse}
                onMouseLeave={handleMouse}
                className={`py-1 px-2 rounded-xl bg-opacity-80 hover:bg-opacity-100 transition-all text-white relative ${classname}`}
            >
                {info && label && <Info>{label}</Info>}
                {text}
            </button>
        </>
    );
}
