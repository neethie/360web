import { useAppStore } from "../../../store/UseAppStore";
export default function Overlay() {
    const { setPanelModal } = useAppStore();

    const handleClick = () => {
        setPanelModal(0);
    };
    return (
        <div
            onClick={handleClick}
            className="bg-[#000] fixed inset-0 z-[100] opacity-80 h-screen w-screen"
        ></div>
    );
}
