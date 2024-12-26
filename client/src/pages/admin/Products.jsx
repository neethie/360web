import { Link } from "react-router-dom";
import ProductCard from "../../components/ui/products/ProductCard";
import Button from "../../components/ui/utils/Button";
import { ProductsTemp } from "../../data/products";

export default function Products() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="">
                    <h2 className="font-semibold text-3xl">
                        Todos los productos
                    </h2>
                    <p>0 en total</p>
                </div>
                <Link to={"create"}>
                    <Button text={"Crear"} classname={"bg-blue-600"} />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2 ">
                {ProductsTemp.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        edit
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}
