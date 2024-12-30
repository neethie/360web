import { Link } from "react-router-dom";

export default function Logo({ to }) {
    return (
        <Link
            to={to}
            style={{
                backgroundImage: "url('./icons/logo.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
            className="flex flex-col items-center w-[125px] h-[50px]"
        />
    );
}
