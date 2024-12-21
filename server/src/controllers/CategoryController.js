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

    static delete = async (req, res) => {
        try {
            const { category_id, name } = req.body;
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("category_id", sql.Int, category_id)
                .input("name", sql.VarChar, name)
                .execute("DeleteCategory");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar eliminar una categoria",
            });
            console.error(error);
        }
    };
}
