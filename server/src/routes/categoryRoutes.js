import { Router } from "express";

import { CategoryController } from "../controllers/CategoryController.js";
import { body, oneOf, param } from "express-validator";
import { handleErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/count", CategoryController.getCount);

router.get("/", CategoryController.getAll);

router.get(
    "/:category_id",
    param("category_id")
        .isInt({ min: 1 })
        .withMessage("El category_id es inválido"),
    handleErrors,
    CategoryController.getById
);

router.post(
    "/create",
    authenticate,
    body("name")
        .isLength({
            min: 3,
        })
        .withMessage("Nombre inválido"),

    handleErrors,
    CategoryController.create
);

router.post(
    "/update-status",

    body("category_id")
        .isInt({ min: 1 })
        .withMessage("El category_id ingresado es inváldio"),
    body("is_disabled").isInt({ min: 0, max: 1 }).withMessage("Valores 1 o 0"),

    handleErrors,
    CategoryController.updateStatus
);

export default router;
