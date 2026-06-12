import { validationResult, param } from "express-validator";
import JSendResponse from "../utils/JSendResponse.js";

export const validarId= [
    param("id")
        .isInt({min: 1})
        .withMessage("El ID debe ser numérico")
        .toInt()
]

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()){
        return res.status(400).json(JSendResponse.formatJSendError(errores.array()));
    }

    next();
}  