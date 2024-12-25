import { TempCategories } from "../../data/categories";
import Category from "./components/panel/categories/Category";

export default function Categories() {
    return (
        <div className="space-y-6">
            <div className="">
                <h2 className="font-semibold text-3xl">Todas las categorias</h2>
                <p>12490 en total</p>
            </div>
            <table className="w-full p-2 border-spacing-y-12">
                <thead>
                    <tr className="text-gray-400 text-left border-t-2 border-b-2 h-10">
                        <th className="font-normal w-80">Nombre</th>
                        <th className="font-normal w-60">Estado</th>
                        <th className="font-normal w-36">Productos</th>
                        <th className="font-normal text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody className="">
                    {TempCategories.map((category) => (
                        <Category
                            key={category.category_id}
                            category={category}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
