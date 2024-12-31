import sql from "mssql";

import { sqlConfig } from "../data/connection.js";

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
            const { category_id, is_disabled } = req.body;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("category_id", sql.Int, category_id)
                .input("is_disabled", sql.Bit, is_disabled)
                .execute("UpdateCategoryStatus");

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
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .query("SELECT COUNT(*) FROM categories WHERE is_disabled = 0");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de categorias",
            });
            console.error(error);
        }
    };
}
