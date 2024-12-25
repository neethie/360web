import ResumeCard from "./components/home/ResumeCard";

import { ResumeType } from "../../utils/constants";
import Earnings from "./components/home/Earnings";
import Header from "../../components/ui/layouts/admin/Header";

export default function Home() {
    return (
        <>
            <Header />
            <h3 className="font-bold text-xl">Dashboard</h3>
            <section className="">
                <div className="flex md:flex-row flex-col gap-2">
                    {ResumeType.getAllTypes().map((item) => (
                        <ResumeCard key={item.type} resume={item.type} />
                    ))}
                </div>
            </section>
            <section className="p-2 rounded-lg border w-1/2">
                <h3 className="textl-xl font-bold">Ganancias</h3>
                <Earnings />
            </section>
        </>
    );
}
