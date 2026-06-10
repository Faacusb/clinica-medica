import { body } from "express-validator";

export const validarEspecialidad = [
    body('nombre')
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ max: 150 }).withMessage("El nombre no puede tener más de 150 caracteres")
        
]

