import api from "@/utils/axios";

export class OrdersAPI {
    static countAll = async () => {
        try {
            const url = "/orders/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    static getAll = async () => {
        try {
            const url = "/orders";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    static getById = async (order_id) => {
        try {
            const url = `/orders/${order_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    static getByMaster = async (order_id) => {
        try {
            const url = `/orders/detail/${order_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    static getByUserId = async (user_id) => {
        try {
            const url = `/orders/user/${user_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    static getEarnings = async () => {
        try {
            const url = "/orders/earnings";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    //

    static updateStatus = async (orderData) => {
        try {
            const url = "/orders/update-status";
            const { data } = await api.post(url, orderData);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}
