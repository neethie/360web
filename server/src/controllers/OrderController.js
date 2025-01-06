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
                    "SELECT SUM(total_price) FROM orders WHERE MONTH(date_creation)  = MONTH(GETDATE())"
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

            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .query("SELECT COUNT(*) FROM orders");

            res.send(results.recordset);
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
            console.log(user_id);
            console.log(req.user.user_id);
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
            const pool = await sql.connect(sqlConfig);

            const results = await pool
                .request()
                .input("user_id", sql.Int, user_id)
                .execute("CreateOrder");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar crear una orden",
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
