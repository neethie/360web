import ErrorMessage from "@/components/ui/ErrorMessage";

export default function UserForm({ errors, register, user }) {
    return (
        <>
            <div className="space-y-4">
                <div className=" p-2 rounded-xl space-y-2 bg-white h-max">
                    <legend className="font-bold my-2 text-lg">
                        Credenciales
                    </legend>

                    <div className="flex flex-col gap-2">
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                        <label
                            htmlFor="form_user_email"
                            className="font-medium"
                        >
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
                        {!user && (
                            <>
                                {errors.password && (
                                    <ErrorMessage>
                                        {errors.password.message}
                                    </ErrorMessage>
                                )}
                                <label
                                    htmlFor="form_user_password"
                                    className="font-medium"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="form_user_password"
                                    placeholder="Ingresar contraseña"
                                    className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                                    {...register("password")}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className=" p-2 rounded-xl space-y-2 bg-white h-max">
                    <legend className="font-bold my-2 text-lg">
                        Información General
                    </legend>
                    <div className="flex flex-col gap-2">
                        {errors.full_name && (
                            <ErrorMessage>
                                {errors.full_name.message}
                            </ErrorMessage>
                        )}
                        <label
                            htmlFor="form_user_full_name"
                            className="font-medium"
                        >
                            Nombre Completo
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
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col w-full">
                                {errors.phone && (
                                    <ErrorMessage>
                                        {errors.phone.message}
                                    </ErrorMessage>
                                )}
                                <label
                                    htmlFor="form_user_full_phone"
                                    className="font-medium"
                                >
                                    Teléfono
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="form_user_phone"
                                    placeholder="12345678"
                                    defaultValue={user?.phone}
                                    className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                                    {...register("phone")}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                {errors.birthday && (
                                    <ErrorMessage>
                                        {errors.birthday.message}
                                    </ErrorMessage>
                                )}
                                <label
                                    htmlFor="form_user_birthday"
                                    className="font-medium"
                                >
                                    Fecha de nacimiento
                                </label>
                                <input
                                    type="date"
                                    name="birthday"
                                    id="form_user_birthday"
                                    className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                                    max={new Date().toISOString().split("T")[0]}
                                    defaultValue={
                                        user?.birthday
                                            ? new Date(user.birthday)
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    {...register("birthday")}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            {errors.address && (
                                <ErrorMessage>
                                    {errors.address.message}
                                </ErrorMessage>
                            )}
                            <label
                                htmlFor="form_user_full_address"
                                className="font-medium"
                            >
                                Dirección
                            </label>
                            <textarea
                                name="address"
                                id="form_user_address"
                                placeholder="Dirección #23, casa #9"
                                className="bg-gray-100 p-2 rounded-xl focus:bg-transparent"
                                defaultValue={user?.address}
                                {...register("address")}
                            />
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    value={"Guardar"}
                    className="bg-blue-400 opacity-80 hover:opacity-100 cursor-pointer text-white px-2 py-1 rounded-md w-max"
                />
            </div>
        </>
    );
}
