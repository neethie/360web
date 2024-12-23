/*
    Falta: autorizacion para cada transaccion
*/

import jwt from "jsonwebtoken";
import sql from "mssql";
import dotenv from "dotenv";

import { sqlConfig } from "../data/connection.js";

dotenv.config();

export const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401).json({ error: "No autorizado" });
        return;
    }
    const token = bearer.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const pool = await sql.connect(sqlConfig);
        const response = await pool
            .request()
            .input("user_id", sql.Int, decoded.data)
            .query(
                "SELECT user_id, email, full_name FROM users WHERE user_id = @user_id"
            );

        if (response.recordset.length) {
            req.user = decoded.data;
            return;
        }
        res.status(500).json({
            error: "Token inválido",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Token inválido",
        });
    }
};
