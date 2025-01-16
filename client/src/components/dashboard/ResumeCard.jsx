import { FaStore } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

export default function ResumeCard({ resume }) {
    const iconMap = {
        0: <FaStore className="w-10 h-10" />,
        1: <FaCalendarAlt className="w-10 h-10" />,
        2: <FaBookOpen className="w-10 h-10" />,
        3: <FaUser className="w-10 h-10" />,
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: [resume.queryKey],
        queryFn: resume.queryFunction,
    });

    if (isLoading) return "Cargando...";
    if (isError) return "Error";
    return (
        <div
            className=" p-3 w-full md:w-48 text-white rounded-xl shadow-lg flex items-center justify-between"
            style={{
                backgroundColor: resume.color,
            }}
        >
            {iconMap[resume.id]}
            <div className="text-right">
                <p>{resume.label}</p>
                {data ? (
                    <p className="font-bold text-3xl">{data.count}</p>
                ) : (
                    <p className="font-bold text-3xl">-</p>
                )}
            </div>
        </div>
    );
}
