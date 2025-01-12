import sql from "mssql";

import { sqlConfig } from "../data/connection.js";
import { checkPermissions } from "../middleware/permissions.js";

export class OrderController {
    static getEarnings = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .query(
                    "SELECT SUM(total_price) FROM orders WHERE MONTH(date_creation) = MONTH(GETDATE()) AND (status_id = 2)"
                );

            res.send(results.recordset);
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

            const count = 10;
            res.send({ count });
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

            const pool = await sql.connect(sqlConfig);
            const results = await pool.request().execute("LoadOrders");

            if (!results.recordset.length) {
                res.status(404).json({
                    error: "No hay datos",
                });
                return;
            }

            res.send(results.recordset);
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

            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("user_id", sql.Int, user_id)
                .execute("LoadOrdersByUser");
            res.send(results.recordset);
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
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .execute("LoadOrder");

            if (!results.recordset.length) {
                res.status(404).json({
                    error: "No existe ese order_id",
                });
                return;
            }

            if (
                results.recordset[0].user_id != req.user.user_id &&
                req.user.rol_id === 1
            )
                return res.status(401).json({ error: "No autorizado" });

            res.send(results.recordset);
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
            const pool = await sql.connect(sqlConfig);
            const checkOrder = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .query(
                    "SELECT order_id, user_id FROM orders WHERE order_id = @order_id"
                );

            if (!checkOrder.recordset.length) {
                res.status(404).json({
                    error: "No existe ese order_id",
                });
                return;
            }

            if (checkOrder.recordset[0].user_id !== user_id) {
                res.status(403).json({
                    error: "No autorizado",
                });
                return;
            }

            const result = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .input("status", sql.Int, 4)
                .execute("UpdateOrderStatus");

            res.json(result.recordset);
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

            const { order_id, status } = req.body;
            const pool = await sql.connect(sqlConfig);
            const checkOrder = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .query(
                    "SELECT order_id FROM orders WHERE order_id = @order_id"
                );

            if (!checkOrder.recordset.length) {
                res.status(404).json({
                    error: "No existe ese order_id",
                });
                return;
            }

            const result = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .input("status", sql.Int, status)
                .execute("UpdateOrderStatus");

            res.json(result.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar el estado de una orden",
            });
            console.error(error);
        }
    };
}
