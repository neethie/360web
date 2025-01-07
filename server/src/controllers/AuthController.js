import sql from "mssql";
import bcrypt from "bcrypt";

import { sqlConfig } from "../data/connection.js";
import { SALT_ROUNDS } from "../config/securityConfig.js";
import { generateJWT } from "../utils/jwt.js";

export class AuthController {
    static register = async (req, res) => {
        try {
            const {
                email,
                password,
                full_name,
                phone,
                birthday,
                rol_id,
                address,
            } = req.body;
            const pool = await sql.connect(sqlConfig);
            const checkEmail = await pool
                .request()
                .input("email", sql.VarChar, email)
                .query("SELECT user_id FROM users WHERE email = @email");

            if (checkEmail.recordset.length !== 0) {
                res.status(409).json({
                    error: "Ya existe ese correo",
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const result = await pool
                .request()
                .input("email", sql.VarChar, email)
                .input("password", sql.VarChar, hashedPassword)
                .input("full_name", sql.VarChar, full_name)
                .input("phone", sql.VarChar, phone)
                .input("birthday", sql.DateTime, birthday)
                .input("rol_id", sql.Int, rol_id)
                .input("address", sql.VarChar, address)
                .execute("CreateUser");

            const { user_id } = result.recordset[0];
            const token = generateJWT({ user_id });
            res.send(token);
        } catch (error) {
            res.status(500).json({
                message: "Hubo un error al intentar registrar al usuario",
            });
            console.error(error);
        }
    };

    static login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const pool = await sql.connect(sqlConfig);
            const result = await pool
                .request()
                .input("email", sql.VarChar, email)
                .query("SELECT * FROM users WHERE email = @email");

            if (result.recordset.length === 0) {
                res.status(409).json({
                    error: "No existe ese correo",
                });
                return;
            }

            const dbPassword = result.recordset[0].password;
            const verifyPassword = await bcrypt.compare(password, dbPassword);
            if (!verifyPassword) {
                res.status(401).json({
                    message: "Datos erróneos",
                });
                return;
            }

            if (result.recordset[0].is_disabled) {
                res.status(423).json({
                    error: "El usuario está inhabilitado",
                });
                return;
            }
            const { user_id } = result.recordset[0];
            const token = generateJWT({ user_id });
            res.send(token);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar iniciar sesión del usuario",
            });
            console.error(error);
        }
    };

    static user = async (req, res) => {
        return res.send(req.user);
    };
}
