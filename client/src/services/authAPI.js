import api from "@/utils/axios";

export class AuthAPI {
    static authenticate = () => {};
    static login = async (formData) => {
        try {
            const { data } = await api.post("/auth/login", formData);
            localStorage.setItem("AUTH_TOKEN", data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    static getUser = async () => {
        try {
            const { data } = await api("/auth/user");
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}
