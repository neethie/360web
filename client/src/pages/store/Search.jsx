import ProductCard from "../../components/ui/products/ProductCard";
import { ProductsTemp } from "../../data/products";
import { useState } from "react";
import { TempCategories } from "../../data/categories";
import CategoryItem from "./components/CategoryItem";

export default function Search() {
    const [filter, setFilter] = useState({
        category: 1,
        minPrice: 0,
        maxPrice: 10000,
    });

    const handleChange = (e) => {
        if (e.target.name === "min_price") {
            setFilter({ ...filter, minPrice: e.target.value });
        } else if (e.target.name === "max_price") {
            setFilter({ ...filter, maxPrice: e.target.value });
        }
    };

    const handleClick = (category_id) => {
        setFilter({ ...filter, category: category_id });
    };

    return (
        <div className="grid grid-cols-[1fr_3fr]">
            <form className="border mx-10 h-max">
                <p className="border-b p-2 font-semibold">Filtrar por</p>
                <div className="flex flex-col p-2">
                    <p className="font-semibold">Categorias</p>
                    {TempCategories.map((category) => (
                        <CategoryItem
                            key={category.category_id}
                            handleClick={handleClick}
                            category={category}
                            selected={filter.category === category.category_id}
                        />
                    ))}
                </div>
                <div className="flex flex-col p-2">
                    <p className="font-semibold">Precio</p>
                    <div className="px-2">
                        <p>Precio mínimo</p>
                        <div className="flex justify-between text-xs text-green-800">
                            <p>Q0.00</p>
                            <p className="font-semibold ">
                                Q{filter.minPrice}.00
                            </p>
                            <p>Q10,000.00</p>
                        </div>
                        <input
                            type="range"
                            name="min_price"
                            id="min_price"
                            className="w-full"
                            min={0}
                            max={10000}
                            step={5}
                            value={filter.minPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="px-2">
                        <p>Precio máximo</p>
                        <div className="flex justify-between text-xs text-green-800">
                            <p>Q0.00</p>
                            <p className="font-semibold ">
                                Q{filter.maxPrice}.00
                            </p>
                            <p>Q10,000.00</p>
                        </div>
                        <input
                            type="range"
                            name="max_price"
                            id="max_price"
                            className="w-full"
                            value={filter.maxPrice}
                            min={0}
                            max={10000}
                            step={5}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-400 opacity-80 hover:opacity-100 text-white mx-2"
                    >
                        Buscar
                    </button>
                </div>
            </form>
            <main className="space-y-2">
                <p className="text-2xl font-semibold">
                    Resultados de la búsqueda
                </p>
                <div className="grid grid-cols-3 gap-8">
                    <ProductCard product={ProductsTemp[3]} />
                    <ProductCard product={ProductsTemp[3]} />
                    <ProductCard product={ProductsTemp[3]} />
                    <ProductCard product={ProductsTemp[3]} />
                    <ProductCard product={ProductsTemp[3]} />
                </div>
            </main>
        </div>
    );
}
