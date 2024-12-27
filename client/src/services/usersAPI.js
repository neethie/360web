import api from "../utils/axios";

export class UsersAPI {
    static getAll = async () => {
        try {
            const url = "/users";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    static countAll = async () => {
        try {
            const url = "/users/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}

export async function getUsers() {
    try {
        const url = "/users";
        const { data } = await api(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}
