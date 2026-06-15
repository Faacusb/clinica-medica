import express from "express";
import apicache from "apicache";
import EspecialidadesController from "../../controllers/especialidadesController.js";
import { validarEspecialidad } from "../../middleware/especialidadesValidation.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authMiddleware.js";

const router = express.Router();
const cache = apicache.middleware;

const especialidadesController = new EspecialidadesController();

router.get(
    "/",
    autenticarJWT,
    cache("5 minutes"),
    especialidadesController.listarEspecialidades
);

router.get(
    "/:id",
    autenticarJWT,
    cache("5 minutes"),
    validarId,
    validarCampos,
    especialidadesController.obtenerPorId
);

router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarEspecialidad,
    validarCampos,
    especialidadesController.crearEspecialidad
);

router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarEspecialidad,
    validarCampos,
    especialidadesController.editarEspecialidad
);

router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    especialidadesController.eliminarEspecialidad
);

export default router;