import { Router } from "express";

import { DetailController } from "../controllers/DetailController.js";
import { param, body, oneOf } from "express-validator";
import { handleErrors } from "../middleware/validation.js";

const router = Router();

router.get(
    "/:order_id",
    param("order_id")
        .isInt({ min: 1 })
        .withMessage("El order_id ingresado es inválido"),

    handleErrors,
    DetailController.getByMaster
);

router.post(
    "/create",
    body("order_id")
        .isInt({ min: 1 })
        .withMessage("El order_id ingresado es inválido"),
    body("product_id")
        .isInt({ min: 1 })
        .withMessage("El product_id ingresado es inválido"),
    body("quantity")
        .isInt({ min: 1 })
        .withMessage("La cantidad ingresada es inválida"),

    handleErrors,
    DetailController.create
);

router.patch(
    "/update",
    body("order_details_id")
        .isInt({ min: 1 })
        .withMessage("El order_details_id ingresado es inválido"),
    oneOf([
        body("product_id")
            .isInt({ min: 1 })
            .withMessage("El product_id ingresado es inválido"),
        body("quantity")
            .isInt({ min: 1 })
            .withMessage("La cantidad ingresada es inválida"),
    ]),

    handleErrors,
    DetailController.create
);

export default router;
