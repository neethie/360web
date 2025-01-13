import { OrderServices } from "../services/orderServices.js";

export class DetailController {
    static getByMaster = async (req, res) => {
        try {
            const { order_id } = req.params;

            const detail = await OrderServices.getDetail(order_id);

            if (!detail) {
                res.status(404).json({
                    error: "No hay detalles para esa orden o la orden no existe",
                });
                return;
            }

            res.send(detail);
        } catch (error) {
            res.status(500).json({
                error: "Hubo un error al intentar obtener todos los detalles de la orden",
            });
            console.error(error);
        }
    };
}
