import ProductCard from "@/components/product/ProductCard";

const ProductsTemp = [
    {
        product_id: 1,
        name: "Laptop Gamer",
        brand: "ASUS",
        price: 3200,
    },
    {
        product_id: 2,
        name: "Monitor Ultra HD",
        brand: "Samsung",
        price: 1500,
    },
    {
        product_id: 3,
        name: "Teclado Mecánico RGB",
        brand: "Logitech",
        price: 200,
    },
    {
        product_id: 4,
        name: "Mouse Inalámbrico",
        brand: "Razer",
        price: 180,
    },
];

export default function MainView() {
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
                        La potencia que necesitás{" "}
                        <span className="italic underline">día con día</span>
                    </p>
                    <button className="bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-xl w-max self-end">
                        Ver laptops
                    </button>
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
                        <ProductCard product={ProductsTemp[0]} />
                        <ProductCard product={ProductsTemp[1]} />
                        <ProductCard product={ProductsTemp[2]} />
                        <ProductCard product={ProductsTemp[3]} />
                    </div>
                </section>
            </div>
        </>
    );
}
