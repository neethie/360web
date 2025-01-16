import api from "@/utils/axios";
import { isAxiosError } from "axios";

export class CategoriesAPI {
    static getAll = async () => {
        try {
            const url = "/categories";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static countAll = async () => {
        try {
            const url = "/categories/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static countProducts = async (category_id) => {
        try {
            const url = `/categories/count/${category_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static getById = async (category_id) => {
        try {
            const url = `/categories/${category_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static create = async (formData) => {
        try {
            const url = "/categories/create";
            const { data } = await api.post(url, formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static update = async (formData) => {
        try {
            const url = "/categories/update";
            const { data } = await api.patch(url, formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static updateStatus = async (category_id) => {
        try {
            const url = "/categories/update-status";
            const { data } = await api.patch(url, { category_id });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };
}
