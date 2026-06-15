import { body, check } from "express-validator";

export const validarMedico = [
    body("id_usuario")
        .trim()
        .notEmpty()
        .isInt({min: 1})
        .withMessage("El ID de usuario debe ser un número entero positivo")
        .toInt(),

    body("id_especialidad")
        .trim()
        .notEmpty()
        .isInt({min: 1})
        .withMessage("El ID de especialidad debe ser un número entero positivo")
        .toInt(),

    body("matricula")
        .trim()
        .notEmpty()
        .isInt({min: 1})
        .withMessage("La matrícula debe ser un número entero positivo")
        .toInt(),

    body("descripcion")
        .optional({ nullable: true, checkFalsy: true })
        .trim(),

    body("valor_consulta")
        .trim()
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("El valor de la consulta debe ser un número positivo")
        .toFloat()
        
]

export const validarActualizacionMedico = [

    body("id_especialidad")
        .optional({ checkFalsy: true })
        .trim()
        .isInt({min: 1})
        .withMessage("El ID de especialidad debe ser un número entero positivo")
        .toInt(),
    
    body("matricula")
        .optional({ checkFalsy: true })
        .trim()
        .isInt({min: 1})
        .withMessage("La matrícula debe ser un número entero positivo")
        .toInt(),

    body("descripcion")
        .optional({ nullable: true, checkFalsy: true })
        .trim(),

    body("valor_consulta")
        .optional({ checkFalsy: true })
        .trim()
        .isFloat({ min: 0 })
        .withMessage("El valor de la consulta debe ser un número positivo")
        .toFloat()
]