export default function ProductPanel() {
    return (
        <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] p-4 rounded-xl w-3/5">
            <div className="flex justify-between items-center px-2">
                <h3 className="text-2xl font-semibold">
                    Crear un nuevo Producto
                </h3>

                <button className="bg-blue-400 text-white px-2 py-1 rounded-2xl bg-opacity-80 hover:bg-opacity-100">
                    Crear
                </button>
            </div>

            <form
                action=""
                className="grid grid-cols-[3fr_2fr] p-2 rounded-xl gap-4"
            >
                <div className="bg-gray-100 p-2 rounded-xl">
                    <legend className="font-bold">Información General</legend>
                    <div className="flex flex-col">
                        <label
                            htmlFor="panel_product_name"
                            className="font-medium"
                        >
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            name="panel_product_name"
                            id="panel_product_name"
                            placeholder="Ryzen 5 3500u"
                            className="bg-gray-200 p-2 rounded-xl"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="panel_product_brand"
                                className="font-medium"
                            >
                                Marca
                            </label>
                            <input
                                type="text"
                                name="panel_product_name"
                                id="panel_product_name"
                                placeholder="AMD"
                                className="bg-gray-200 p-2 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label
                                htmlFor="panel_product_category"
                                className="font-medium"
                            >
                                Categoria
                            </label>

                            <select
                                name="panel_product_category"
                                id="panel_product_category"
                                className="bg-gray-200 p-2 rounded-xl"
                            >
                                <option value="none" selected disabled>
                                    Escoge una categoria
                                </option>
                                <option value="procesadores">
                                    Procesadores
                                </option>
                                <option value="procesadores">
                                    Procesadores
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-2 rounded-xl row-span-2 flex flex-col justify-between">
                    <legend className="font-bold">Añade una imagen</legend>

                    <input
                        type="file"
                        name="panel_product_image"
                        id="panel_product_image"
                        accept="image/png, image/jpeg"
                        className="w-full"
                    />
                    <button className="bg-red-500 text-white px-2 py-1 rounded-2xl bg-opacity-80 hover:bg-opacity-100">
                        Limpiar Imagen
                    </button>
                </div>
                <div className="bg-gray-100 p-2 rounded-xl">
                    <legend className="font-bold">Etiquetado</legend>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="panel_product_price"
                                className="font-medium"
                            >
                                Precio
                            </label>
                            <input
                                type="number"
                                name="panel_product_price"
                                id="panel_product_price"
                                placeholder="2,000.00"
                                step={0.01}
                                min={0}
                                className="bg-gray-200 p-2 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="panel_product_stock"
                                className="font-medium"
                            >
                                Existencias
                            </label>
                            <input
                                type="number"
                                name="panel_product_stock"
                                id="panel_product_stock"
                                placeholder="12"
                                min={1}
                                className="bg-gray-200 p-2 rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
