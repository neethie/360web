export default function Hero() {
    return (
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
    );
}
