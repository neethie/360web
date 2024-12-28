import { Router } from "express";

import { ProductController } from "../controllers/ProductController.js";
import { handleErrors } from "../middleware/validation.js";
import { body, param } from "express-validator";

const router = Router();

router.get("/count", ProductController.getCount);
router.get("/", ProductController.getAll);
router.get(
    "/:product_id",
    param("product_id")
        .isInt({ min: 1 })
        .withMessage("El product_id es inválido"),

    handleErrors,
    ProductController.getById
);
router.get(
    "/search",
    param("name").optional(),
    param("brand").optional(),
    param("price_min").optional(),
    param("price_max").optional(),
    param("category_id").optional(),
    ProductController.getBy
);

router.post(
    "/create",
    body("name").isLength({ min: 3, max: 100 }).withMessage("Nombre inválido"),
    body("brand").isLength({ min: 3, max: 50 }).withMessage("Marca inválida"),
    body("price")
        .isDecimal({ decimal_digits: 2, force_decimal: true })
        .withMessage("Precio inválido"),
    body("stock").isInt({ min: 1 }).withMessage("Cantidad de stock inválido"),
    body("category_id").isInt({ min: 1 }).withMessage("Categoria inválida"),
    body("code").isLength({ min: 3, max: 50 }).withMessage("Código inválido"),
    handleErrors,
    ProductController.create
);

router.patch(
    "/update",
    body("product_id")
        .isInt({
            min: 1,
        })
        .withMessage("ID de producto inválido"),
    body("name")
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage("Nombre inválido"),
    body("brand")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Marca inválida"),
    body("price")
        .optional()
        .isDecimal({ decimal_digits: 2, force_decimal: true })
        .withMessage("Precio inválido"),
    body("stock")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Cantidad de stock inválido"),
    body("category_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Categoria inválida"),
    body("code")
        .optional()
        .isLength({ min: 3, max: 50 })
        .withMessage("Código inválido"),
    handleErrors,
    ProductController.update
);

router.post(
    "/update-status",
    body("product_id")
        .isInt({ min: 1 })
        .withMessage("El product_id ingresado es inválido"),
    body("status").isBoolean().withMessage("El estado es inválido"),

    handleErrors,
    ProductController.updateStatus
);

export default router;
