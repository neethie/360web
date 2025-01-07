import ErrorMessage from "@/components/ui/ErrorMessage";

import { useQuery } from "@tanstack/react-query";
import { CategoriesAPI } from "@/services/categoriesAPI";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Button from "../ui/Button";

export default function ProductForm({ errors, register, product, watch }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadCategories"],
        queryFn: CategoriesAPI.getAll,
    });

    const [picture, setPicture] = useState("");

    let tempProduct = product
        ? product
        : {
              name: "Producto nuevo",
              brand: "Sin marca",
              category_id: 1,
              price: 1,
              stock: 1,
              image_url: picture,
          };

    tempProduct = {
        name: watch("name"),
        brand: watch("brand"),
        category_id: watch("category_id"),
        price: watch("price"),
        stock: watch("stock"),
        image: watch("image"),
        image_url: picture,
    };
    useEffect(() => {
        if (tempProduct.image?.[0]) {
            setPicture(URL.createObjectURL(tempProduct.image[0]));
        } else if (product?.image_url) {
            setPicture(product.image_url);
        } else setPicture("");
    }, [tempProduct.image, product?.image_url]);
    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    if (!data) return "No hay categorias";

    return (
        <>
            <div className="flex gap-4 flex-col">
                <div className=" p-2 rounded-xl space-y-2 bg-white">
                    <legend className="font-bold my-2 text-lg">
                        Información General
                    </legend>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="form_product_name"
                            className="font-medium"
                        >
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
                                <ErrorMessage>
                                    {errors.brand.message}
                                </ErrorMessage>
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
                                defaultValue={product?.category_id}
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
                    <legend className="font-bold my-2 text-lg">Imagen</legend>
                    <div className="flex items-center justify-center flex-col gap-2">
                        <label
                            htmlFor="form_product_image"
                            className="font-medium bg-gray-100 px-2 py-1 rounded-xl cursor-pointer hover:bg-blue-300"
                        >
                            Seleccionar
                        </label>
                    </div>
                    <input
                        type="file"
                        id="form_product_image"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        {...register("image")}
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
                                <ErrorMessage>
                                    {errors.price.message}
                                </ErrorMessage>
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
                                <ErrorMessage>
                                    {errors.stock.message}
                                </ErrorMessage>
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
            </div>
            <div className="flex gap-4 flex-col">
                <div className=" p-2 rounded-xl space-y-2 bg-white">
                    <legend className="font-bold my-2 text-lg">
                        Vista previa
                    </legend>
                    <div className="flex justify-center items-center">
                        <ProductCard product={tempProduct} preview />
                    </div>
                </div>
                <div className="flex justify-between">
                    <input
                        type="submit"
                        value={"Guardar"}
                        className="bg-blue-400 opacity-80 hover:opacity-100 cursor-pointer text-white px-2 py-1 rounded-xl"
                    />
                    {product && (
                        <Button
                            text={
                                product.is_disabled
                                    ? "Habilitar"
                                    : "Deshabilitar"
                            }
                            classname={
                                product.is_disabled
                                    ? "bg-green-400"
                                    : "bg-red-400"
                            }
                            handle={() => console.log("hola")}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
