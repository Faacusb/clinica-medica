import { body } from "express-validator";

export const validarPaciente = [
    body("id_usuario")
        .trim()
        .notEmpty()
        .isInt({min: 1})
        .withMessage("El ID de usuario debe ser un número entero positivo")
        .toInt(),

    body("id_obra_social")
        .trim()
        .notEmpty()
        .isInt({min: 1})
        .withMessage("El ID de obra social debe ser un número entero positivo")
        .toInt(),
]

export const validarActualizacionPaciente = [
    body("id_usuario")
        .optional({ checkFalsy: true })
        .trim()
        .isInt({min: 1})
        .withMessage("El ID de usuario debe ser un número entero positivo")
        .toInt(),

    body("id_obra_social")
        .optional({ checkFalsy: true })
        .trim()
        .isInt({min: 1})
        .withMessage("El ID de obra social debe ser un número entero positivo")
        .toInt(),

]