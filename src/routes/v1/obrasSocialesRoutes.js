import express from "express";
import apicache from "apicache";
import ObrasSocialesController from "../../controllers/obrasSocialesController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarObraSocial, validarActualizacionObraSocial } from "../../middleware/obrasSocialesValidation.js";

const router = express.Router();
const cache = apicache.middleware;

const obrasSocialesController = new ObrasSocialesController();

router.get(
    "/",
    cache("5 minutes"),
    obrasSocialesController.listarObrasSociales
);

router.get(
    "/:id",
    cache("5 minutes"),
    validarId,
    validarCampos,
    obrasSocialesController.obtenerPorId
);

router.post(
    "/",
    validarObraSocial,
    validarCampos,
    obrasSocialesController.crearObraSocial
);

router.put(
    "/:id",
    validarId,
    validarActualizacionObraSocial,
    validarCampos,
    obrasSocialesController.editarObraSociales
);

router.delete(
    "/:id",
    validarId,
    validarCampos,
    obrasSocialesController.eliminarObrasSociales
);

export default router;