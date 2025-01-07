import { isAxiosError } from "axios";
import api from "@/utils/axios";
import { useProductStore } from "../hooks/useProductStore";

export class ProductsAPI {
    static countAll = async () => {
        try {
            const url = "/products/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error))
                return new Error(error.response.data.error);
        }
    };

    static getAll = async () => {
        try {
            const url = "/products";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error))
                return new Error(error.response.data.error);
        }
    };

    static getTop = async () => {
        try {
            const url = "/products/top";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error))
                return new Error(error.response.data.error);
        }
    };

    static getById = async (product_id) => {
        try {
            const url = `/products/get/${product_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error))
                return new Error(error.response.data.error);
        }
    };

    static getImageById = async (product_id) => {
        try {
            const url = `/products/get-image/${product_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error))
                return new Error(error.response.data.error);
        }
    };

    static searchBy = async (searchData) => {
        try {
            const url = `/products/search`;
            const { data } = await api(url, {
                params: {
                    category_id:
                        searchData.category_id === -1
                            ? null
                            : parseInt(searchData.category_id),
                    name: searchData.name === -1 ? null : searchData.name,
                    min_price:
                        searchData.min_price === 0
                            ? null
                            : searchData.min_price,
                    max_price:
                        searchData.max_price === 10000
                            ? null
                            : searchData.max_price,
                },
            });
            useProductStore.getState().setProductsStore(data);
            return data;
        } catch (error) {
            if (isAxiosError(error))
                return new Error(error.response.data.error);
        }
    };

    static create = async (formData) => {
        try {
            const { data } = await api.post("/products/create", formData);
            return data;
        } catch (error) {
            console.error(error);
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.errors[0].msg);
            }
        }
    };

    static update = async (formData) => {
        try {
            const url = "/products/update";
            const { data } = await api.patch(url, formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.errors[0].msg);
            }
        }
    };

    static updateStatus = async (product_id) => {
        try {
            const url = "/products/update-status";
            const { data } = await api.patch(url, { product_id });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.errors[0].msg);
            }
        }
    };
}
