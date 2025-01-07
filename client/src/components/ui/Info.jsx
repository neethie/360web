export default function Info({ children }) {
    return (
        <div className="absolute bg-gray-400 shadow-lg top-5 text-xs right-1/2 px-2 py-1 rounded-full">
            <p>{children}</p>
        </div>
    );
}
