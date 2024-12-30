export default function Button({ text, handle, classname }) {
    const handleClick = () => {
        if (handle) handle();
    };
    return (
        <button
            onClick={handleClick}
            className={`py-1 px-2 rounded-xl bg-opacity-80 hover:bg-opacity-100 transition-all text-white ${classname}`}
        >
            {text}
        </button>
    );
}
