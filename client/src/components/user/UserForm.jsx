import ErrorMessage from "@/components/ui/ErrorMessage";

export default function UserForm({ errors, register, user }) {
    return (
        <>
            <div className=" p-2 rounded-xl space-y-2 bg-white h-max">
                <legend className="font-bold my-2 text-lg">
                    Información General
                </legend>

                <div className="flex flex-col gap-2">
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                    <label
                        htmlFor="form_user_full_name"
                        className="font-medium"
                    >
                        Nombre del Usuario
                    </label>
                    <input
                        type="text"
                        name="full_name"
                        id="form_user_full_name"
                        placeholder="Cristobal Colón"
                        className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                        defaultValue={user?.full_name}
                        {...register("full_name")}
                    />

                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                    <label htmlFor="form_user_email" className="font-medium">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        id="form_user_email"
                        placeholder="cristobal@colon.com"
                        className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                        defaultValue={user?.email}
                        {...register("email")}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <div className=" p-2 rounded-xl space-y-2 bg-white h-max">
                    <legend className="font-bold my-2 text-lg">Permisos</legend>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="form_user_rol" className="font-medium">
                            Rol
                        </label>
                        <select
                            name="rol_id"
                            id="form_user_rol"
                            className="bg-gray-100 p-2 rounded-xl"
                            value={user.rol_id}
                            {...register("rol_id")}
                        >
                            <option value={1}>Cliente</option>
                            <option value={2}>Operador</option>
                            <option value={3}>Administrador</option>
                        </select>
                    </div>
                </div>

                <div className=" p-2 rounded-xl space-y-2 bg-white h-max">
                    <legend className="font-bold my-2 text-lg">Acceso</legend>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="form_user_status"
                            className="font-medium"
                        >
                            Estado
                        </label>
                        <select
                            name="is_disabled"
                            id="form_user_status"
                            className="bg-gray-100 p-2 rounded-xl"
                            defaultValue={user.is_disabled ? 1 : 0}
                            {...register("is_disabled")}
                        >
                            <option value={0}>Habilitado</option>
                            <option value={1}>Desactivado</option>
                        </select>
                    </div>
                </div>
            </div>
            <input
                type="submit"
                value={"Guardar"}
                className="bg-blue-400 opacity-80 hover:opacity-100 cursor-pointer text-white px-2 py-1 rounded-md w-max"
            />
        </>
    );
}
