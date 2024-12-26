import { NavLink } from "react-router-dom";

export default function Logo({ to }) {
    return (
        <NavLink to={to} className="flex flex-col items-center">
            <img
                src="./logo.png"
                alt="Logo mi tiendita"
                width={125}
                height={50}
            />
        </NavLink>
    );
}
