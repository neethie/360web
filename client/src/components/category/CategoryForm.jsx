import ErrorMessage from "@/components/ui/ErrorMessage";

export default function CategoryForm({ errors, register, category }) {
    return (
        <>
            <div className=" p-2 rounded-xl space-y-2 bg-white">
                <legend className="font-bold my-2 text-lg">
                    Información General
                </legend>

                <div className="flex flex-col gap-2">
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                    <label htmlFor="form_category_name" className="font-medium">
                        Nombre de la categoria
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="form_category_name"
                        placeholder="Computadoras gamer"
                        className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                        defaultValue={category?.name}
                        {...register("name", {
                            required: "El nombre es obligatorio",
                        })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="form_category_status"
                        className="font-medium"
                    >
                        Estado
                    </label>
                    <select
                        name="is_disabled"
                        id="form_category_status"
                        className="bg-gray-100 p-2 rounded-xl"
                        defaultValue={category?.is_disabled ? 1 : 0}
                        {...register("is_disabled")}
                    >
                        <option value={0}>Habilitada</option>
                        <option value={1}>Deshabilitada</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={"Guardar"}
                    className="bg-blue-400 opacity-80 hover:opacity-100 cursor-pointer text-white px-2 py-1 rounded-md"
                />
            </div>
        </>
    );
}
