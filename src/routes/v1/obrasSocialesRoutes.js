import express from "express";
import apicache from "apicache";
import ObrasSocialesController from "../../controllers/obrasSocialesController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarObraSocial, validarActualizacionObraSocial } from "../../middleware/obrasSocialesValidation.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();
const cache = apicache.middleware;

const obrasSocialesController = new ObrasSocialesController();

router.get(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    cache("5 minutes"),
    obrasSocialesController.listarObrasSociales
);

router.get(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    cache("5 minutes"),
    validarId,
    validarCampos,
    obrasSocialesController.obtenerPorId
);

router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarObraSocial,
    validarCampos,
    obrasSocialesController.crearObraSocial
);

router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarActualizacionObraSocial,
    validarCampos,
    obrasSocialesController.editarObraSociales
);

router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    obrasSocialesController.eliminarObrasSociales
);

export default router;