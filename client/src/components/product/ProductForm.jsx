import ErrorMessage from "@/components/ui/ErrorMessage";

import { useQuery } from "@tanstack/react-query";
import { CategoriesAPI } from "@/services/categoriesAPI";

export default function ProductForm({ errors, register, product }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadCategories"],
        queryFn: CategoriesAPI.getAll,
    });

    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data) return "No hay categorias";

    return (
        <>
            <div className=" p-2 rounded-xl space-y-2 bg-white">
                <legend className="font-bold my-2 text-lg">
                    Información General
                </legend>

                <div className="flex flex-col gap-2">
                    <label htmlFor="form_product_name" className="font-medium">
                        Nombre del producto
                    </label>
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                    <input
                        type="text"
                        name="name"
                        id="form_product_name"
                        placeholder="Ryzen 5 3500u"
                        className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                        defaultValue={product?.name}
                        {...register("name")}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="form_product_brand"
                            className="font-medium"
                        >
                            Marca
                        </label>
                        {errors.brand && (
                            <ErrorMessage>{errors.brand.message}</ErrorMessage>
                        )}
                        <input
                            type="text"
                            name="brand"
                            id="form_product_brand"
                            placeholder="AMD"
                            className="bg-gray-100 p-2 rounded-xl"
                            defaultValue={product?.brand}
                            {...register("brand")}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label
                            htmlFor="form_product_category"
                            className="font-medium"
                        >
                            Categoria
                        </label>

                        <select
                            name="category_id"
                            id="form_product_category"
                            className="bg-gray-100 p-2 rounded-xl"
                            defaultValue={product.category_id}
                            {...register("category_id")}
                        >
                            {data.map((category) => (
                                <option
                                    value={category.category_id}
                                    key={category.category_id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className=" p-2 rounded-xl space-y-2 bg-white">
                <legend className="font-bold my-2 text-lg">Vista previa</legend>
            </div>
            <div className=" p-2 rounded-xl space-y-2 bg-white">
                <legend className="font-bold my-2 text-lg">Imagen</legend>
                <input
                    type="file"
                    id="form_product_image"
                    accept="image/png, image/jpeg"
                    className="w-full"
                />
            </div>
            <div>
                <input
                    type="submit"
                    value={"Guardar"}
                    className="bg-blue-400 opacity-80 hover:opacity-100 cursor-pointer text-white px-2 py-1 rounded-md"
                />
            </div>
            <div className=" p-2 rounded-xl space-y-2 bg-white">
                <legend className="font-bold my-2 text-lg">Precio</legend>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="form_product_price"
                            className="font-medium"
                        >
                            Precio
                        </label>
                        {errors.price && (
                            <ErrorMessage>{errors.price.message}</ErrorMessage>
                        )}
                        <input
                            type="number"
                            name="price"
                            id="form_product_price"
                            placeholder="2,000.00"
                            step={0.01}
                            className="bg-gray-100 p-2 rounded-xl"
                            defaultValue={product?.price}
                            {...register("price")}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="form_product_stock"
                            className="font-medium"
                        >
                            Existencias
                        </label>
                        {errors.stock && (
                            <ErrorMessage>{errors.stock.message}</ErrorMessage>
                        )}
                        <input
                            type="number"
                            name="stock"
                            id="form_product_stock"
                            placeholder="12"
                            className="bg-gray-100 p-2 rounded-xl"
                            defaultValue={product?.stock}
                            {...register("stock")}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
