import { validationResult } from "express-validator";
import JSendResponse from "../utils/JSendResponse.js";

export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()){
        return res.status(400).json(JSendResponse.formatJSendError(errores.array()));
    }

    next();
}  