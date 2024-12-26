import { useState } from "react";

export default function ProductForm({ create, product }) {
    const [productInfo, setProductInfo] = useState({
        name: "",
        brand: "",
        category_id: "1",
        image: "",
        price: 0,
        stock: 0,
    });
    if (product) {
        setProductInfo(product);
    }
    return (
        <>
            <h2 className="font-semibold text-3xl">
                {create ? "Nuevo Producto" : "Editar Producto"}
            </h2>
            <div className="">
                <form
                    action=""
                    className="grid grid-cols-[3fr_2fr] p-2 rounded-xl gap-4 bg-gray-100"
                >
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
                            <input
                                type="text"
                                name="form_product_name"
                                id="form_product_name"
                                placeholder="Ryzen 5 3500u"
                                className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                                value={productInfo.name}
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
                                <input
                                    type="text"
                                    name="form_product_name"
                                    id="form_product_name"
                                    placeholder="AMD"
                                    className="bg-gray-100 p-2 rounded-xl"
                                    value={productInfo.brand}
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
                                    name="form_product_category"
                                    id="form_product_category"
                                    className="bg-gray-100 p-2 rounded-xl"
                                >
                                    <option value="none" selected disabled>
                                        Escoge una categoria
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className=" p-2 rounded-xl space-y-2 bg-white">
                        <legend className="font-bold my-2 text-lg">
                            Vista previa
                        </legend>
                    </div>
                    <div className=" p-2 rounded-xl space-y-2 bg-white">
                        <legend className="font-bold my-2 text-lg">
                            Imagen
                        </legend>
                        <input
                            type="file"
                            name="form_product_image"
                            id="form_product_image"
                            accept="image/png, image/jpeg"
                            className="w-full"
                        />
                    </div>
                    <div className="">
                        <input
                            type="submit"
                            value={
                                create ? "Crear Producto" : "Editar Producto"
                            }
                            className="bg-blue-400 opacity-80 hover:opacity-100 cursor-pointer text-white px-2 py-1 rounded-md"
                        />
                    </div>
                    <div className=" p-2 rounded-xl space-y-2 bg-white">
                        <legend className="font-bold my-2 text-lg">
                            Precio
                        </legend>
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="form_product_price"
                                    className="font-medium"
                                >
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    name="form_product_price"
                                    id="form_product_price"
                                    placeholder="2,000.00"
                                    step={0.01}
                                    min={0}
                                    className="bg-gray-100 p-2 rounded-xl"
                                    value={productInfo.price}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="form_product_stock"
                                    className="font-medium"
                                >
                                    Existencias
                                </label>
                                <input
                                    type="number"
                                    name="form_product_stock"
                                    id="form_product_stock"
                                    placeholder="12"
                                    min={1}
                                    className="bg-gray-100 p-2 rounded-xl"
                                    value={productInfo.stock}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
