import express from "express";
import apicache from "apicache";
import MedicosController from "../../controllers/medicosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarActualizacionMedico, validarMedico } from "../../middleware/medicosValidation.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();

const cache = apicache.middleware;

const medicosController = new MedicosController();

router.get(
    "/",
    autenticarJWT,
    autorizarRoles(2, 3),
    cache("5 minutes"),
    medicosController.listarMedicos
);

router.get(
    "/:id",
    autenticarJWT,
    autorizarRoles(2, 3),
    cache("5 minutes"),
    validarId,
    validarCampos,
    medicosController.obtenerPorId
);

router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarMedico,
    validarCampos,
    medicosController.crearMedico
);

router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarActualizacionMedico,
    validarCampos,
    medicosController.editarMedico
);

router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    medicosController.eliminarMedico
);

export default router;