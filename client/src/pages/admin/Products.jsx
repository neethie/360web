import ProductCard from "../../components/ui/products/ProductCard";
import Button from "../../components/ui/utils/Button";
import { ProductsTemp } from "../../data/products";
import { useAppStore } from "../../store/UseAppStore";

export default function Products() {
    const { setPanelModal } = useAppStore();

    const handleCreate = () => {
        setPanelModal(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-3xl">
                        Todos los productos
                    </h2>
                    <p>12490 en total</p>
                </div>
                <Button
                    text={"Crear"}
                    handle={handleCreate}
                    classname={"bg-blue-600"}
                />
            </div>
            <div className="grid grid-cols-4 gap-x-2 gap-y-2">
                {ProductsTemp.map((product) => (
                    <ProductCard key={product.id} edit product={product} />
                ))}
            </div>
        </div>
    );
}
