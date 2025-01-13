import { sequelize } from "../data/db.js";

export class OrderServices {
    static getEarnings = async () => {
        const [results] = await sequelize.query(
            "SELECT SUM(total_price) FROM orders WHERE MONTH(date_creation) = MONTH(GETDATE()) AND (status_id = 2)"
        );
        return results;
    };

    static getCount = async () => {
        const [count] = await sequelize.query(
            "SELECT COUNT(*) as count FROM orders"
        );
        return count[0];
    };

    static getAll = async () => {
        const [results] = await sequelize.query("LoadOrders");
        return results;
    };

    static getByUserId = async (user_id) => {
        const [results] = await sequelize.query("LoadOrdersByUser :user_id", {
            replacements: {
                user_id,
            },
        });
        return results;
    };

    static getByOrderId = async (order_id) => {
        const [results] = await sequelize.query("LoadOrder :order_id", {
            replacements: {
                order_id,
            },
        });
        return results;
    };

    static updateStatus = async (data) => {
        const [results] = await sequelize.query(
            "UpdateOrderStatus :order_id, :status",
            {
                replacements: data,
            }
        );
        return results;
    };
}
