import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ProductCard from "@/components/product/ProductCard";

import { ProductsAPI } from "@/services/productsAPI";
import { CategoriesAPI } from "@/services/categoriesAPI";
import { useAppStore } from "../../hooks/useAppStore";
import { setSearchQuery } from "../../utils/search";

export default function SearchView() {
    const location = useLocation();

    const { search, setSearch } = useAppStore();

    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            category_id: -1,
            min_price: 0,
            max_price: 10000,
        },
    });

    const results = useQueries({
        queries: [
            {
                queryKey: ["loadAvailableProducts"],
                queryFn: ProductsAPI.getAll,
            },
            {
                queryKey: ["loadCategories"],
                queryFn: CategoriesAPI.getAll,
            },
            {
                queryKey: ["searchProducts", search],
                queryFn: () => ProductsAPI.searchBy(search),
            },
        ],
    });

    const products = results[0];
    const categories = results[1];
    const productsSearch = results[2];

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleForm = (data) => {
        const newSearch = {
            ...search,
            ...data,
            category_id: parseInt(data.category_id),
        };
        navigate(`/search?${setSearchQuery(newSearch)}`);
        setSearch(newSearch);
        queryClient.invalidateQueries(["searchProducts", newSearch]);
    };

    if (products.isLoading || categories.isLoading) return "Cargando...";
    if (products.isError || categories.isError) return "Error...";
    if (!products.data || !categories.data) return "No hay productos";

    return (
        <div className="grid grid-cols-[1fr_3fr]">
            <form
                onSubmit={handleSubmit(handleForm)}
                className="border mx-10 h-max"
            >
                <p className="border-b p-2 font-semibold">Filtrar por</p>

                <div className="flex flex-col p-2">
                    <p className="font-semibold">Categorias</p>
                    <div className="flex justify-between items-center px-2">
                        <label>Todo</label>
                        <input
                            type="radio"
                            name="all"
                            id="category_all"
                            value={-1}
                            defaultChecked
                            {...register("category_id")}
                        />
                    </div>

                    {categories.data.map((category) => (
                        <div
                            key={category.category_id}
                            className="flex justify-between items-center px-2"
                        >
                            <label>{category.name}</label>
                            <input
                                type="radio"
                                name={category.name}
                                id={category.name}
                                value={category.category_id}
                                {...register("category_id")}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col p-2">
                    <p className="font-semibold">Precio</p>
                    <div className="px-2">
                        <p>Precio mínimo</p>
                        <div className="flex justify-between text-xs text-green-800">
                            <p>Q0.00</p>
                            <p className="font-semibold ">
                                Q{watch("min_price")}.00
                            </p>
                            <p>Q10,000.00</p>
                        </div>
                        <input
                            type="range"
                            className="w-full"
                            min={0}
                            max={10000}
                            step={5}
                            name="min_price"
                            id="min_price"
                            value={watch("min_p rice")}
                            {...register("min_price")}
                        />
                    </div>
                    <div className="px-2">
                        <p>Precio máximo</p>
                        <div className="flex justify-between text-xs text-green-800">
                            <p>Q0.00</p>
                            <p className="font-semibold ">
                                Q{watch("max_price")}.00
                            </p>
                            <p>Q10,000.00</p>
                        </div>
                        <input
                            type="range"
                            className="w-full"
                            min={0}
                            max={10000}
                            step={5}
                            name="max_price"
                            id="max_price"
                            value={watch("max_price")}
                            {...register("max_price")}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <button
                            type="submit"
                            className="bg-blue-400 opacity-80 hover:opacity-100 text-white mx-2"
                        >
                            Buscar
                        </button>
                        <button
                            type="submit"
                            onClick={() => {
                                reset();
                                navigate("/search");
                            }}
                            className="bg-red-400 opacity-80 hover:opacity-100 text-white mx-2"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </form>
            <main className="space-y-2 pr-8">
                <p className="text-2xl font-semibold">
                    {search.name.length > 0
                        ? `Resultados de la busqueda: '${search.name}'`
                        : "Nuestros productos"}
                </p>
                <div className="grid grid-cols-3 gap-4">
                    {!location.search
                        ? products.data.map((product) => (
                              <ProductCard
                                  key={product.product_id}
                                  product={product}
                              />
                          ))
                        : productsSearch.data?.map((product) => (
                              <ProductCard
                                  key={product.product_id}
                                  product={product}
                              />
                          ))}
                </div>
            </main>
        </div>
    );
}
