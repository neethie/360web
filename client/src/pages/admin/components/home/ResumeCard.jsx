import { FaStore } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ResumeType } from "../../../../utils/constants";

export default function ResumeCard({ resume }) {
    const iconMap = {
        1: <FaStore className="w-10 h-10" />,
        2: <FaCalendarAlt className="w-10 h-10" />,
        3: <FaBookOpen className="w-10 h-10" />,
        4: <FaUser className="w-10 h-10" />,
    };

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
                <p className="font-bold text-3xl">-</p>
            </div>
        </div>
    );
}
