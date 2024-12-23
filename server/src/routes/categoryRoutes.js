import { Router } from "express";

import { CategoryController } from "../controllers/CategoryController.js";
import { body, oneOf } from "express-validator";
import { handleErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", CategoryController.getAll);
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
