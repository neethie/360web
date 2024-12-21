/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                product: "#c9463c",
                order: "#6b3cc9",
                categorie: "#3cc941",
                user: "#4a3cc9",
            },
        },
    },
    plugins: [],
};
