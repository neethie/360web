import sql from "mssql";

import { sqlConfig } from "../data/connection.js";

export class ProductController {
    static getAll = async (req, res) => {
        try {
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .query("SELECT * FROM products");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los productos",
            });
            console.error(error);
        }
    };

    static getBy = async (req, res) => {
        try {
            const {
                name = null,
                brand = null,
                price_min = 0,
                price_max = 99999,
                category_id = null,
            } = req.query;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("name", sql.VarChar, name)
                .input("brand", sql.VarChar, brand)
                .input("price_min", sql.Int, price_min)
                .input("price_max", sql.Int, price_max)
                .input("category_id", sql.Int, category_id)
                .execute("LoadProducts");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener los productos",
            });
            console.error(error);
        }
    };

    static create = async (req, res) => {
        try {
            const { name, brand, price, stock, category_id, code } = req.body;
            const pool = await sql.connect(sqlConfig);

            const results = await pool
                .request()
                .input("name", sql.VarChar, name)
                .input("brand", sql.VarChar, brand)
                .input("price", sql.Decimal, price)
                .input("stock", sql.Int, stock)
                .input("category_id", sql.Int, category_id)
                .input("code", sql.VarChar, code)
                .execute("CreateProduct");

            res.send(results.recordset);
        } catch (error) {
            res.status(404).json({
                error: "No se encontró category_ud",
            });
            console.error(error);
        }
    };
    static update = async (req, res) => {
        try {
            const {
                product_id,
                name = null,
                brand = null,
                category_id = null,
                price = null,
                stock = null,
                code = null,
            } = req.body;

            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("product_id", sql.Int, product_id)
                .input("name", sql.VarChar, name)
                .input("brand", sql.VarChar, brand)
                .input("price", sql.Decimal, price)
                .input("stock", sql.Int, stock)
                .input("category_id", sql.Int, category_id)
                .input("code", sql.VarChar, code)
                .execute("UpdateProduct");

            if (!results.recordset.length) {
                res.status(404).json({
                    error: "No se encontró el product_id",
                });
                return;
            }

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar el producto",
            });
            console.error(error);
        }
    };

    static updateStatus = async (req, res) => {
        try {
            const { product_id, status } = req.body;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("product_id", sql.Int, product_id)
                .input("status", sql.Bit, status)
                .execute("UpdateProductStatus");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar actualizar el estado del producto",
            });
            console.error(error);
        }
    };
}
