import { Router } from "express";

import { DetailController } from "../controllers/DetailController.js";
import { param, body, oneOf } from "express-validator";
import { handleErrors } from "../middleware/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get(
    "/:order_id",
    param("order_id")
        .isInt({ min: 1 })
        .withMessage("El order_id ingresado es inválido"),

    handleErrors,
    DetailController.getByMaster
);

export default router;
