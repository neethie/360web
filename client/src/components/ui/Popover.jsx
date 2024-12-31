import { Link } from "react-router-dom";

export default function Popover({ data }) {
    return (
        <nav className="absolute -top-0 flex flex-col bg-white px-2 shadow-md gap-2">
            {data.map((item) => (
                <Link key={item.category_id}>{item.name}</Link>
            ))}
        </nav>
    );
}
