import axios from "axios";

export async function getOrders() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/orders`;
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}
