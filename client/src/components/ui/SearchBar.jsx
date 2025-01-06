import { CiSearch } from "react-icons/ci";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useAppStore } from "../../hooks/useAppStore";
import { setSearchQuery } from "../../utils/search";
import { useQueryClient } from "@tanstack/react-query";

export default function SearchBar() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const { search, setSearch } = useAppStore();

    const queryClient = useQueryClient();

    const handleSearch = (data) => {
        const newSearch = {
            ...search,
            name: data.name.length > 0 ? data.name : -1,
        };

        navigate(`/search?${setSearchQuery(newSearch)}`);
        setSearch(newSearch);
        queryClient.invalidateQueries(["searchProducts", newSearch]);
    };

    return (
        <form onSubmit={handleSubmit(handleSearch)}>
            <div className="bg-gray-100 flex items-center rounded-full px-2">
                <label htmlFor="Buscar" className="text-gray-500">
                    <CiSearch />
                </label>
                <input
                    type="text"
                    name="name"
                    id="form_search"
                    placeholder="Buscar"
                    className="px-2 text-sm py-1 bg-gray-100 placeholder:text-gray-500 focus:outline-none"
                    {...register("name")}
                />
            </div>
        </form>
    );
}
