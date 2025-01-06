import ProductCard from "@/components/product/ProductCard";
import { ProductsAPI } from "@/services/productsAPI";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function MainView() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["loadTopProducts"],
        queryFn: ProductsAPI.getTop,
    });
    const navigate = useNavigate();

    if (isLoading) return "Cargando...";
    if (isError) return "Hubo un error (loadTopProducts)";
    return (
        <>
            <div className="bg-orange-300 text-white grid grid-cols-[2fr_1fr] items-center md:mb-24">
                <img
                    src="https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/hp-latest-products/HP_Q22_LATAM_LANDING_AMD_VIS_ID_Hero_banner_1200x600_withlogo.jpg"
                    alt="Hero icon"
                    className="md:h-[400px] object-fill h-[175px]"
                />

                <div className="space-y-2 flex flex-col p-4">
                    <p className="md:text-7xl font-bold text-center md:text-left md:-translate-x-40 cursor-default transition-all">
                        Lo que necesitás{" "}
                        <span className="italic underline">en un click</span>
                    </p>
                    <div className="self-end">
                        <Button
                            text={"Ver productos"}
                            handle={() => navigate("/search")}
                            classname={"bg-orange-400"}
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-4">
                <section className="space-y-4">
                    <div className="flex justify-center ">
                        <p className="text-3xl font-semibold text-center">
                            Estos productos te pueden interesar
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 grid-rows-1 justify-items-center min-w-0">
                        {Array.isArray(data) &&
                            data.map((product) => (
                                <ProductCard
                                    key={product.product_id}
                                    product={product}
                                />
                            ))}
                    </div>
                </section>
            </div>
        </>
    );
}
