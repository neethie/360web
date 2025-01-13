import sql from "mssql";

import { sqlConfig } from "../data/connection.js";
import { checkPermissions } from "../middleware/permissions.js";
import { OrderServices } from "../services/orderServices.js";

export class OrderController {
    static getEarnings = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const earnings = await OrderServices.getEarnings();
            res.send(earnings);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener las ganancias de órdenes",
            });
            console.error(error);
        }
    };
    static getCount = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const count = await OrderServices.getCount();
            res.send(count);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de órdenes",
            });
            console.error(error);
        }
    };
    static getAll = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const orders = await OrderServices.getAll();
            if (!orders) {
                res.status(404).json({
                    error: "No hay datos",
                });
                return;
            }
            res.send(orders);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todas las ordenes",
            });
            console.error(error);
        }
    };

    static getByUserId = async (req, res) => {
        try {
            const { user_id } = req.params;
            if (user_id != req.user.user_id)
                return res.status(401).json({ error: "No autorizado" });
            const order = await OrderServices.getByUserId(user_id);
            res.send(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todas las ordenes",
            });
            console.error(error);
        }
    };

    static getById = async (req, res) => {
        try {
            const { order_id } = req.params;
            const order = await OrderServices.getByOrderId(order_id);
            if (!order) {
                res.status(404).json({
                    error: "No existe ese order_id",
                });
                return;
            }
            if (order.user_id != req.user.user_id && req.user.rol_id === 1)
                return res.status(401).json({ error: "No autorizado" });
            res.send(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener una orden",
            });
            console.error(error);
        }
    };

    static create = async (req, res) => {
        try {
            const { user_id } = req.user;

            const { cart } = req.body;

            const products = cart.map((item) => item.product_id);
            const quantities = cart.map((item) => item.quantity);
            const pool = await sql.connect(sqlConfig);

            const checkStockQuery = `SELECT product_id, name, stock FROM products WHERE product_id IN (${products.join(
                ","
            )})`;
            const checkStock = await pool.request().query(checkStockQuery);

            for (let i = 0; i < cart.length; i++) {
                const productIndex = checkStock.recordset.findIndex(
                    (item) => item.product_id === cart[i].product_id
                );
                if (quantities[i] > checkStock.recordset[productIndex].stock) {
                    return res.status(409).json({
                        error: `El producto ${checkStock.recordset[productIndex].name} no tiene suficiente stock`,
                    });
                }
            }

            const results = await pool
                .request()
                .input("user_id", sql.Int, user_id)
                .execute("CreateOrder");

            for (const item of cart) {
                const { product_id, quantity } = item;

                await pool
                    .request()
                    .input("order_id", sql.Int, results.recordset[0].order_id)
                    .input("product_id", sql.Int, product_id)
                    .input("quantity", sql.Int, quantity)
                    .execute("CreateOrderProducts");
            }

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar crear una orden",
            });
            console.error(error);
        }
    };

    static cancel = async (req, res) => {
        try {
            const { user_id } = req.user;
            const { order_id } = req.body;

            const order = await OrderServices.getByOrderId(order_id);

            if (!order) {
                res.status(404).json({
                    error: "No existe ese order_id",
                });
                return;
            }
            if (order[0].user_id !== user_id) {
                res.status(403).json({
                    error: "No autorizado",
                });
                return;
            }

            await OrderServices.updateStatus({
                order_id,
                status: 4,
            });
            res.json(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar cancelar una orden",
            });
            console.error(error);
        }
    };

    static updateStatus = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const order = await OrderServices.updateStatus(req.body);
            res.json(order);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar el estado de una orden",
            });
            console.error(error);
        }
    };
}
