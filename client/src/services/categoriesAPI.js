import api from "../utils/axios";

const urlBase = "/categories";

export class CategoriesAPI {
    static getAll = async () => {
        try {
            const url = "/categories";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    static countAll = async () => {
        try {
            const url = urlBase + "/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}

export async function getCategories() {
    try {
        const url = "/categories";
        const { data } = await api(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}
