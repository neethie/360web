import api from "../utils/axios";

export class ProductsAPI {
    static countAll = async () => {
        try {
            const url = "/products/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    static getAll = async () => {
        try {
            const url = "/products";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}
