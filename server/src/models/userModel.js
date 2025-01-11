import { DataTypes, QueryTypes } from "sequelize";
import { sequelize } from "../data/db.js";

export class UserModel {
    static getAll = async () => {
        const [results] = await sequelize.query(
            "EXECUTE [dbo].[LoadUsersData]"
        );
        return results;
    };

    static getByUserId = async (user_id) => {
        try {
            const [results] = await sequelize.query(
                "EXECUTE [dbo].[LoadUserData] :user_id",
                {
                    replacements: { user_id },
                }
            );
            return results;
        } catch (error) {
            throw error;
        }
    };

    static getCount = async () => {
        const [results] = await sequelize.query(
            "SELECT COUNT(*) FROM [dbo].[users]",
            {
                type: QueryTypes.SELECT,
            }
        );
        return results;
    };

    static update = async (data) => {
        const {
            user_id,
            email = null,
            full_name = null,
            phone = null,
            birthday = null,
            address = null,
            rol_id = null,
            is_disabled = null,
        } = data;

        const [results] = await sequelize.query(
            "EXECUTE [dbo].[UpdateUser] :user_id, :email, :full_name, :phone, :birthday, :address, :is_disabled, :rol_id ",
            {
                replacements: {
                    user_id,
                    email,
                    full_name,
                    phone,
                    birthday,
                    address,
                    is_disabled,
                    rol_id,
                },
                type: QueryTypes.UPDATE,
            }
        );
        return results;
    };
}

export const User = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        full_name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        birthday: {
            type: DataTypes.DATE,
        },
        address: {
            type: DataTypes.STRING,
        },
        rol_id: {
            type: DataTypes.INTEGER,
        },
        is_disabled: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
        tableName: "users",
    }
);
