import { FaStore } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ResumeType } from "../../../../utils/constants";

import { useQueries } from "@tanstack/react-query";
import { CategoriesAPI } from "../../../../services/categoriesAPI";
import { ProductsAPI } from "../../../../services/productsAPI";
import { OrdersAPI } from "../../../../services/ordersAPI";
import { UsersAPI } from "../../../../services/usersAPI";

export default function ResumeCard({ resume }) {
    const iconMap = {
        1: <FaStore className="w-10 h-10" />,
        2: <FaCalendarAlt className="w-10 h-10" />,
        3: <FaBookOpen className="w-10 h-10" />,
        4: <FaUser className="w-10 h-10" />,
    };

    const queries = useQueries({
        queries: [
            {
                queryKey: ["productsCount"],
                queryFn: ProductsAPI.countAll,
            },
            {
                queryKey: ["ordersCount"],
                queryFn: OrdersAPI.countAll,
            },
            {
                queryKey: ["categoriesCount"],
                queryFn: CategoriesAPI.countAll,
            },
            {
                queryKey: ["usersCount"],
                queryFn: UsersAPI.countAll,
            },
        ],
    });

    const data = queries[resume - 1]?.data;
    const isLoading = queries[resume - 1]?.isLoading;
    const isError = queries[resume - 1]?.isError;
    const count = Array.isArray(data) && data.length > 0 ? data[0][""] : 0;

    return (
        <div
            className="bg-indigo-400 p-3 w-full md:w-48 text-white rounded-xl shadow-lg flex items-center justify-between"
            style={{
                backgroundColor: ResumeType.getColorByType(resume),
            }}
        >
            {iconMap[resume]}
            <div className="text-right">
                <p>{ResumeType.getLabel(resume)}</p>
                {isLoading ? (
                    <p>Cargando...</p>
                ) : isError ? (
                    <p>Error</p>
                ) : (
                    <p className="font-bold text-3xl">{count}</p>
                )}
            </div>
        </div>
    );
}
