import api from "@/utils/axios";
import { isAxiosError } from "axios";

export class AuthAPI {
    static login = async (formData) => {
        try {
            const { data } = await api.post("/auth/login", formData);
            localStorage.setItem("AUTH_TOKEN", data);
            return data;
        } catch (error) {
            console.error(error);
            if (isAxiosError(error)) {
                if (error.response.data.error)
                    throw new Error(error.response.data.error);
                else if (error.response.data.errors)
                    throw new Error(error.response.data.errors[0].msg);
                else if (error.response.data)
                    throw new Error(error.response.data.message);
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
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response.data.error)
                    throw new Error(error.response.data.error);
                else if (error.response.data.errors)
                    throw new Error(error.response.data.errors[0].msg);
                else if (error.response.data)
                    throw new Error(error.response.data.message);
            }
        }
    };
}
