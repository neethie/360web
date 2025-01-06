import jwt from "jsonwebtoken";
import sql from "mssql";
import dotenv from "dotenv";

import { sqlConfig } from "../data/connection.js";

dotenv.config();

export const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        req.user = {};
        const error = new Error("No autorizado");
        res.status(401).json({ error: error.message });
        return;
    }
    const token = bearer.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (decoded.user_id) {
            const pool = await sql.connect(sqlConfig);
            const response = await pool
                .request()
                .input("user_id", sql.Int, decoded.user_id)
                .query(
                    "SELECT user_id, email, rol_id, full_name FROM users WHERE user_id = @user_id"
                );
            if (response.recordset.length) {
                req.user = response.recordset[0];
                return next();
            } else {
                req.user = {};
                res.status(401).json({
                    error: "Token inválido (user_id)",
                });
            }
        } else console.log("Tokken inválido");
    } catch (error) {
        res.status(500).json({
            error: "Token inválido",
        });
    }
};
