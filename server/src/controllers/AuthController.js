import bcrypt from "bcrypt";

import { SALT_ROUNDS } from "../config/securityConfig.js";
import { generateJWT } from "../utils/jwt.js";
import { AuthServices } from "../services/authServices.js";
import { UserServices } from "../services/userServices.js";

export class AuthController {
    static register = async (req, res) => {
        try {
            const { email, password } = req.body;

            const userExists = await UserServices.searchEmail(email);

            if (userExists) {
                res.status(409).json({
                    error: "Ya existe ese correo",
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const user = await AuthServices.register({
                ...req.body,
                password: hashedPassword,
            });
            const { user_id } = user[0];
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
            const user = await UserServices.searchEmail(email);

            if (!user) {
                res.status(409).json({
                    error: "No existe ese correo",
                });
                return;
            }
            const verifyPassword = await bcrypt.compare(
                password,
                user.dataValues.password
            );
            if (!verifyPassword) {
                res.status(401).json({
                    message: "Datos erróneos",
                });
                return;
            }
            if (user.dataValues.is_disabled) {
                res.status(423).json({
                    error: "El usuario está inhabilitado",
                });
                return;
            }
            const { user_id } = user.dataValues;
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
