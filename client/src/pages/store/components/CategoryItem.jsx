import { FaCheck } from "react-icons/fa";

export default function CategoryItem({ category, selected, handleClick }) {
    return (
        <button
            type="button"
            className="flex justify-between items-center px-2"
            onClick={() => handleClick(category.category_id)}
        >
            <p className="">{category.name}</p>
            <FaCheck
                className={`${selected ? "text-blue-400" : "text-gray-400"}`}
            />
        </button>
    );
}
