import sql from "mssql";

import { sqlConfig } from "../data/connection.js";
import { checkPermissions } from "../middleware/permissions.js";

export class CategoryController {
    static getAll = async (req, res) => {
        try {
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .query("SELECT * FROM categories");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener las categorias",
            });
            console.error(error);
        }
    };

    static getById = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const { category_id } = req.params;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("category_id", sql.Int, category_id)
                .query(
                    "SELECT * FROM categories WHERE category_id = @category_id"
                );

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener la categoria",
            });
            console.error(error);
        }
    };

    static create = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const { name } = req.body;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("name", sql.VarChar, name)
                .execute("CreateProductCategory");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar crear una categoria",
            });
            console.error(error);
        }
    };

    static updateStatus = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const { category_id } = req.body;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("category_id", sql.Int, category_id)
                .execute("UpdateCategoryStatus");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar eliminar una categoria",
            });
            console.error(error);
        }
    };

    static update = async (req, res) => {
        try {
            checkPermissions(req, res, 2);

            const { category_id, name, is_disabled } = req.body;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("category_id", sql.Int, category_id)
                .input("is_disabled", sql.Bit, is_disabled)
                .input("name", sql.VarChar, name)
                .execute("UpdateCategory");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar eliminar una categoria",
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
                .query("SELECT COUNT(*) FROM categories");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de categorias",
            });
            console.error(error);
        }
    };

    static getProductCount = async (req, res) => {
        try {
            checkPermissions(req, res, 2);
            const { category_id } = req.params;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("category_id", sql.Int, category_id)
                .query(
                    "SELECT COUNT(*) FROM products WHERE category_id = @category_id"
                );

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de categorias",
            });
            console.error(error);
        }
    };
}
