import api from "@/utils/axios";
import { isAxiosError } from "axios";

export class AuthAPI {
    static login = async (formData) => {
        try {
            const { data } = await api.post("/auth/login", formData);
            localStorage.setItem("AUTH_TOKEN", data);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static getUser = async () => {
        const { data } = await api("/auth/user");
        return data;
    };

    static register = async (formData) => {
        try {
            const { data } = await api.post("/auth/register", formData);
            localStorage.setItem("AUTH_TOKEN", data);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };
}
