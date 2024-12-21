import sql from "mssql";

import { sqlConfig } from "../data/connection.js";

export class UserController {
    static getAll = async (req, res) => {
        try {
            const pool = await sql.connect(sqlConfig);
            const results = await pool.request().execute("LoadUsersData");

            // Si hay registros
            if (results.recordset.length) {
                res.status(200).json({
                    data: results.recordset,
                });
                return;
            }

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                message:
                    "Ha ocurrido un error al intentar cargar todos los usuarios",
            });
            console.error(error);
        }
    };

    static getById = async (req, res) => {
        const { user_id } = req.params;
        try {
            const pool = await sql.connect(sqlConfig);
            const results = await pool
                .request()
                .input("user_id", sql.Int, user_id)
                .execute("LoadUserData");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                message:
                    "Ha ocurrido un error al intentar cargar los datos del usuario",
            });
            console.log(error);
        }
    };

    static update = async (req, res) => {
        try {
            const {
                user_id,
                email = null,
                full_name = null,
                phone = null,
                birthday = null,
                address = null,
            } = req.body;
            const pool = await sql.connect(sqlConfig);

            if (email !== null) {
                const checkEmail = await pool
                    .request()
                    .input("email", sql.VarChar, email)
                    .query("SELECT email FROM users WHERE email = @email");

                if (checkEmail.recordset.length) {
                    res.status(409).json({
                        message: "El email ya existe",
                    });
                    return;
                }
            }

            const results = await pool
                .request()
                .input("user_id", sql.Int, user_id)
                .input("email", sql.VarChar, email)
                .input("full_name", sql.VarChar, full_name)
                .input("phone", sql.VarChar, phone)
                .input("birthday", sql.DateTime, birthday)
                .input("address", sql.VarChar, address)
                .execute("UpdateUser");

            res.send(results.recordset);
        } catch (error) {
            res.status(500).json({
                message:
                    "Ha ocurrido un error al intentar actualizar los datos del usuario",
            });
            console.log(error);
        }
    };
}
