import sql from "mssql";

import { sqlConfig } from "../data/connection.js";

export class DetailController {
    static getByMaster = async (req, res) => {
        try {
            const { order_id } = req.params;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .query(
                    "SELECT * FROM order_products WHERE order_id = @order_id"
                );

            if (!results.recordset.length) {
                res.status(404).json({
                    error: "No hay detalles para esa orden o la orden no existe",
                });
                return;
            }

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los detalles de la orden",
            });
            console.error(error);
        }
    };

    static create = async (req, res) => {
        try {
            const { order_id, product_id, quantity } = req.body;
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

            const checkStock = await pool
                .request()
                .input("product_id", sql.Int, product_id)
                .input("quantity", sql.Int, quantity)
                .execute("CheckProductStock");

            if (!checkStock.recordset[0].IsStockAvailable) {
                res.status(409).json({
                    error: "No existe suficiente stock",
                });
                return;
            }

            const results = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .input("product_id", sql.Int, product_id)
                .input("quantity", sql.Int, quantity)
                .execute("CreateOrderProducts");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar crear los detalles de la orden",
            });
            console.error(error);
        }
    };

    static update = async (req, res) => {
        try {
            const {
                order_details_id,
                product_id = null,
                quantity = null,
            } = req.body;
            const pool = await sql.connect(sqlConfig);
            const checkOrderDetail = await pool
                .request()
                .input("order_details_id", sql.Int, order_details_id)
                .query(
                    "SELECT order_details_id FROM order_products WHERE order_details_id = @order_details_id"
                );

            if (!checkOrderDetail.recordset.length) {
                res.status(404).json({
                    error: "No existe ese order_details_id",
                });
                return;
            }

            if (quantity !== null) {
                const checkStock = await pool
                    .request()
                    .input("product_id", sql.Int, product_id)
                    .input("quantity", sql.Int, quantity)
                    .execute("CheckProductStock");

                if (!checkStock.recordset[0].IsStockAvailable) {
                    res.status(409).json({
                        error: "No existe suficiente stock",
                    });
                    return;
                }
            }

            const results = await pool
                .request()
                .input("order_id", sql.Int, order_id)
                .input("product_id", sql.Int, product_id)
                .input("quantity", sql.Int, quantity)
                .execute("CreateOrderProducts");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar crear los detalles de la orden",
            });
            console.error(error);
        }
    };
}
