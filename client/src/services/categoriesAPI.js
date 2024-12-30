import api from "@/utils/axios";

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
            const url = "/categories/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    static getById = async (category_id) => {
        try {
            const url = `/categories/${category_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}
