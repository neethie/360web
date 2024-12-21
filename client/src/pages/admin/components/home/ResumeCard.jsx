export default function ResumeCard({ name, color }) {
    return (
        <div
            className="bg-indigo-400 p-3 w-48 text-white rounded-xl shadow-lg text-right"
            style={{
                backgroundColor: color,
            }}
        >
            <p>{name}</p>
            <p className="font-bold text-3xl">4</p>
        </div>
    );
}
