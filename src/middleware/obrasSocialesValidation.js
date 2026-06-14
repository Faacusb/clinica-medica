import { body } from "express-validator";

export const validarObraSocial = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ max: 120 })
        .withMessage('El nombre no puede tener más de 120 caracteres'),

    body('descripcion')
        .trim()
        .notEmpty()
        .withMessage('La descripción es obligatoria')
        .isLength({ max: 255 })
        .withMessage('La descripción no puede tener más de 255 caracteres'),

    body('porcentaje_descuento')
        .notEmpty()
        .withMessage('El porcentaje de descuento es obligatorio')
        .isFloat({ min: 0, max: 100 })
        .withMessage('El porcentaje de descuento debe ser un número entre 0 y 100')
        .toFloat(),

    body('es_particular')
        .notEmpty()
        .withMessage('El campo es_particular es obligatorio')
        .isIn([0, 1])
        .withMessage('El valor debe ser 0 o 1')
    
]

export const validarActualizacionObraSocial = [
  body("nombre")
    .optional({ checkFalsy: true }) 
    .trim()
    .isLength({ max: 120 })
    .withMessage("El nombre no puede tener más de 120 caracteres"),

  body("descripcion")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage("La descripción no puede tener más de 255 caracteres"),

  body("porcentaje_descuento")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 })
    .withMessage("El porcentaje de descuento debe ser un número entre 0 y 100")
    .toFloat(),

  body("es_particular")
    .optional({ checkFalsy: true })
    .isIn([0, 1])
    .withMessage("El valor debe ser 0 o 1"),
];
