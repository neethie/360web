import Hero from "./components/Hero";

import ProductCard from "../../components/ui/products/ProductCard";
import { ProductsTemp } from "../../data/products";

export default function Store() {
    return (
        <div className="p-4 space-y-4">
            <Hero />

            <div className="space-y-4">
                <div className="flex justify-center ">
                    <p className="text-3xl font-semibold text-center">
                        Procesadores Gama Alta
                    </p>
                </div>
                <div className="grid md:grid-cols-4 grid-rows-1 justify-items-center">
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
