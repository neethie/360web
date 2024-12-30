import ResumeCard from "@/components/dashboard/ResumeCard";
import { Resume } from "@/utils/constants";
import EarningsCard from "../../components/dashboard/EarningsCard";

export default function DashboardView() {
    return (
        <>
            <h3 className="font-bold text-xl">Dashboard</h3>
            <section className="">
                <div className="flex md:flex-row flex-col gap-2">
                    {Resume.Types.map((resume) => (
                        <ResumeCard key={resume.label} resume={resume} />
                    ))}
                </div>
            </section>
            <section className="p-2 rounded-lg border w-1/2">
                <h3 className="textl-xl font-bold">Ganancias</h3>
                <EarningsCard />
            </section>
        </>
    );
}
