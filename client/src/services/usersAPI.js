import api from "@/utils/axios";
import { isAxiosError } from "axios";
export class UsersAPI {
    static getAll = async () => {
        try {
            const url = "/users";
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
            const url = "/users/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };
    static getById = async (user_id) => {
        try {
            const url = `/users/${user_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static updateStatus = async (userData) => {
        try {
            const url = `/users/update-status/`;
            const { data } = await api.patch(url, userData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static update = async (formData) => {
        try {
            const url = `/users/update`;
            const { data } = await api.patch(url, formData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };
}
