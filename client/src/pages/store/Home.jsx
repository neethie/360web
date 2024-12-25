import Hero from "./components/Hero";

import ProductCard from "../../components/ui/products/ProductCard";
import { ProductsTemp } from "../../data/products";

import Button from "../../components/ui/utils/Button";

export default function Store() {
    return (
        <div className="p-4 space-y-4">
            <Hero />

            <div className="space-y-2">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold">
                        Los mejores procesadores
                    </p>
                    <Button text={"Ver todos"} classname={"bg-blue-400"} />
                </div>
                <div className="flex justify-around">
                    <ProductCard product={ProductsTemp[0]} />
                    <ProductCard product={ProductsTemp[1]} />
                    <ProductCard product={ProductsTemp[2]} />
                    <ProductCard product={ProductsTemp[3]} />
                </div>
            </div>

            <div className="space-y-2">
                <p></p>
            </div>
        </div>
    );
}
