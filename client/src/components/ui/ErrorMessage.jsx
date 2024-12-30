export default function ErrorMessage({ children }) {
    return (
        <div className="bg-red-500 text-white uppercase px-2 py-1 text-center font-semibold text-sm">
            {children}
        </div>
    );
}
