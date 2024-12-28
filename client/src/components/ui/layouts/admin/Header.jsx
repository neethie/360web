import { convertDate } from "../../../../utils/date";

export default function Header() {
    const date = new Date();
    const showDate = convertDate(date);

    return (
        <header className="border-b-2 pb-3">
            <p className="font-bold text-xl">Bienvenido de vuelta, Jonathan</p>
            <p className="text-sm">{showDate}</p>
        </header>
    );
}
