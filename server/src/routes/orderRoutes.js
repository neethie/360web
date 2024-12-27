import { Router } from "express";

import { OrderController } from "../controllers/OrderController.js";
import { param, body } from "express-validator";
import { handleErrors } from "../middleware/validation.js";

const router = Router();

router.get("/count", OrderController.getCount);
router.get("/", OrderController.getAll);
router.get(
    "/:order_id",
    param("order_id")
        .isInt({ min: 1 })
        .withMessage("El order_id ingresado no es válido"),

    handleErrors,
    OrderController.getById
);

router.post(
    "/create",
    body("user_id")
        .isInt({ min: 1 })
        .withMessage("El user_id ingresado no es válido"),

    handleErrors,
    OrderController.create
);
router.post(
    "/update-status",
    body("order_id")
        .isInt({ min: 1 })
        .withMessage("El order_id ingresado no es válido"),
    body("status")
        .isInt({ min: 1, max: 3 })
        .withMessage(
            "El estado ingresado es inválido. (1. Pendiente 2. Aceptado 3. Rechazado (eliminar) )"
        ),

    handleErrors,
    OrderController.updateStatus
);

export default router;
