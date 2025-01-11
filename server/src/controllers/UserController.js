import sql from "mssql";

import { sqlConfig } from "../data/connection.js";
import { User, UserModel } from "../models/userModel.js";
import { where } from "sequelize";

export class UserController {
    static getCount = async (req, res) => {
        try {
            const count = await UserModel.getCount();
            res.send(count);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener el conteo de usuarios",
            });
            console.error(error);
        }
    };
    static getAll = async (req, res) => {
        try {
            const users = await UserModel.getAll();
            res.send(users);
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
            const user = await UserModel.getByUserId(user_id);
            res.send(user);
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
            const { email = null } = req.body;

            if (email) {
                const userExists = await User.findAll({
                    where: { email },
                });
                if (userExists.length > 1) {
                    res.status(409).json({
                        message: "El email ya existe",
                    });
                    return;
                }
            }
            const user = await UserModel.update(req.body);
            res.send(user);
        } catch (error) {
            res.status(500).json({
                message:
                    "Ha ocurrido un error al intentar actualizar los datos del usuario",
            });
            console.log(error);
        }
    };

    static updateStatus = async (req, res) => {
        try {
            const { user_id, is_disabled } = req.body;
            await User.update(
                { is_disabled },
                {
                    where: {
                        user_id,
                    },
                }
            );
            res.send("Se ha modificado un usuario");
        } catch (error) {
            res.status(500).json({
                message:
                    "Ha ocurrido un error al intentar actualizar el estado de un usuario",
            });
        }
    };
}
