import { body, param } from "express-validator";

import { handleErrors } from "../middleware/validation.js";

export class AuthValidator {
    static register = () => [
        body("email").isEmail().withMessage("El correo es inválido"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Contraseña inválida"),
        body("full_name")
            .isLength({ min: 5 })
            .withMessage("Nombre completo inválido"),
        body("phone")
            .isLength({ min: 8, max: 8 })
            .withMessage("Teléfono inválido"),
        body("birthday")
            .isISO8601()
            .withMessage("Fecha de nacimiento inválido"),
        body("rol_id")
            .isInt({ min: 1, max: 3 })
            .withMessage("El rol_id es inválido"),
        body("address").isLength({ min: 5 }).withMessage("Dirección inválida"),
        handleErrors,
    ];
    static login = () => [
        body("email").isEmail().withMessage("El correo es inválido"),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Contraseña inválida"),
        handleErrors,
    ];
}
