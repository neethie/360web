import api from "@/utils/axios";
import { isAxiosError } from "axios";

export class OrdersAPI {
    static countAll = async () => {
        try {
            const url = "/orders/count";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };
    static getAll = async () => {
        try {
            const url = "/orders";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static getById = async (order_id) => {
        try {
            const url = `/orders/${order_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static checkById = async (order_id) => {
        try {
            const url = `/orders/check/${order_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static getByMaster = async (order_id) => {
        try {
            const url = `/orders/detail/${order_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static getByDetailId = async (order_details_id) => {
        try {
            const url = `/orders/detail/product/${order_details_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static getByUserId = async (user_id) => {
        try {
            const url = `/orders/user/${user_id}`;
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static getEarnings = async () => {
        try {
            const url = "/orders/earnings";
            const { data } = await api(url);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    // user

    static create = async (cart) => {
        try {
            const url = "/orders/create";
            const { data } = await api.post(url, { cart });
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    //

    static updateStatus = async (orderData) => {
        try {
            const url = "/orders/update-status";
            const { data } = await api.post(url, orderData);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };

    static cancel = async (orderData) => {
        try {
            const url = "/orders/cancel";
            const { data } = await api.post(url, orderData);
            console.log(data);
            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                throw new Error(error.response.data.error);
            }
        }
    };
}
