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
    static getEarnings = async () => {
        try {
            const url = "/orders/earnings";
            const { data } = await api(url);
            return data;
        } catch (error) {
            console.error(error);
        }
    };
}
