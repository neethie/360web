export default function CategoryForm({ create }) {
    return (
        <>
            <h2 className="font-semibold text-3xl">
                {create ? "Nueva Categoria" : "Editar Categoria"}
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
                                htmlFor="form_category_name"
                                className="font-medium"
                            >
                                Nombre de la categoria
                            </label>
                            <input
                                type="text"
                                name="form_category_name"
                                id="form_category_name"
                                placeholder="Computadoras gamer"
                                className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                            />
                        </div>
                        <input
                            type="submit"
                            value={
                                create ? "Crear Categoria" : "Editar Categoria"
                            }
                            className="bg-blue-400 opacity-80 hover:opacity-100 cursor-pointer text-white px-2 py-1 rounded-md"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
