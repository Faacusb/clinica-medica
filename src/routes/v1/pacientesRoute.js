import express from "express";
import apicache from "apicache";
import PacientesController from "../../controllers/pacientesController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";
import { validarActualizacionPaciente, validarPaciente } from "../../middleware/pacientesValidation.js";


const router = express.Router();
const cache = apicache.middleware;

const pacientesController = new PacientesController();

router.get(
    "/",
    cache("5 minutes"),
    pacientesController.listarPacientes
);

router.get(
    "/:id",
    cache("5 minutes"),
    validarId,
    validarCampos,
    pacientesController.obtenerPorId
);

router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarPaciente,
    validarCampos,
    pacientesController.crearPaciente
);

router.put(
    "/:id",
    validarId,
    validarActualizacionPaciente,
    validarCampos,
    pacientesController.editarPaciente
);

export default router;