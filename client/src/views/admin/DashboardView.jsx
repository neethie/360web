import ResumeCard from "@/components/dashboard/ResumeCard";
import { Resume } from "@/utils/constants";
import OrdersView from "./OrdersView";

export default function DashboardView() {
    return (
        <>
            <h3 className="font-semibold text-3xl">Dashboard</h3>
            <section className="my-4 pb-4">
                <div className="flex md:flex-row flex-col gap-2 justify-between">
                    {Resume.Types.map((resume) => (
                        <ResumeCard key={resume.label} resume={resume} />
                    ))}
                </div>
            </section>
            <section className="my-4 border-t-2 py-4">
                <OrdersView />
            </section>
        </>
    );
}
