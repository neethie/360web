export default function Hero() {
    return (
        <div className="bg-orange-300 text-white grid grid-cols-[2fr_1fr] items-center">
            <img
                src="https://www.hp.com/content/dam/sites/worldwide/personal-computers/consumer/hp-latest-products/HP_Q22_LATAM_LANDING_AMD_VIS_ID_Hero_banner_1200x600_withlogo.jpg"
                alt="Hero icon"
                className="h-[400px] object-fill"
            />

            <div className="space-y-2 flex flex-col px-4">
                <p className="text-7xl font-bold -translate-x-40 cursor-default transition-all hover:scale-[1.01]">
                    La potencia que necesitás{" "}
                    <span className="italic underline">día con día</span>
                </p>
                <button className="bg-orange-500 bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-xl w-max self-end">
                    Ver laptops
                </button>
            </div>
        </div>
    );
}
