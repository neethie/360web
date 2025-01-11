import { DataTypes } from "sequelize";
import { sequelize } from "../data/db";

export const Order = sequelize.define(
    "Order",
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        tableName: "orders",
    }
);
