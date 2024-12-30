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

router.delete(
    "/delete",
    oneOf(
        [
            body("name").isLength({
                min: 3,
            }),
            body("category_id").isInt({ min: 1 }),
        ],
        {
            message: "Debes incluir el nombre o una id válida",
        }
    ),

    handleErrors,
    CategoryController.delete
);

export default router;
