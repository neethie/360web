import sql from "mssql";
import path from "path";
import fs from "node:fs";

import { sqlConfig } from "../data/connection.js";
import { checkPermissions } from "../middleware/permissions.js";
import { renameImage } from "../middleware/image.js";

export class ProductController {
    static getCount = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .query("SELECT COUNT(*) FROM products");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de products",
            });
            console.error(error);
        }
    };
    static getAll = async (req, res) => {
        try {
            const pool = await sql.connect(sqlConfig);
            const results = await pool.request().execute("LoadAllProducts");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los productos",
            });
            console.error(error);
        }
    };

    static getTopPurchases = async (req, res) => {
        try {
            const pool = await sql.connect(sqlConfig);
            const results = await pool.request().execute("LoadTopProducts");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener los productos más comprados",
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

    static getById = async (req, res) => {
        try {
            const { product_id } = req.params;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("product_id", sql.Int, product_id)
                .query("SELECT * FROM products WHERE product_id = @product_id");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el producto",
            });
            console.error(error);
        }
    };
    static getImageById = async (req, res) => {
        try {
            const { product_id } = req.params;
            const folderPath = path.resolve("public/products/upload");
            const filePath = path.join(folderPath, `product_${product_id}.png`);
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return res
                        .status(404)
                        .json({ error: "Archivo no encontrado" });
                }

                res.sendFile(filePath);
            });
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
            });
            console.error(error);
        }
    };
    static create = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
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

            const { product_id } = results.recordset[0];

            const filePath = `${process.env.SERVER_URL}${process.env.SERVER_PORT}/public/product_${product_id}.png`;
            await pool
                .request()
                .input("image_url", sql.VarChar, filePath)
                .input("product_id", sql.Int, product_id)
                .query(
                    "UPDATE products SET image_url = @image_url WHERE product_id = @product_id"
                );

            renameImage(req.file, `product_${product_id}.png`);

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error",
            });
            console.error(error);
        }
    };
    static update = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

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

            if (req.file) {
                const filePath = `${process.env.SERVER_URL}${process.env.SERVER_PORT}/public/product_${product_id}.png`;
                await pool
                    .request()
                    .input("image_url", sql.VarChar, filePath)
                    .input("product_id", sql.Int, product_id)
                    .query(
                        "UPDATE products SET image_url = @image_url WHERE product_id = @product_id"
                    );

                renameImage(req.file, `product_${product_id}.png`);
            }

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
            checkPermissions(req, res, 2);

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
