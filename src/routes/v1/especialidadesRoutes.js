import express from "express";
import apicache from "apicache";
import EspecialidadesController from "../../controllers/especialidadesController.js";
import { validarEspecialidad } from "../../middleware/especialidadesValidation.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";

const router = express.Router();
const cache = apicache.middleware;

const especialidadesController = new EspecialidadesController();

router.get(
    "/",
    cache("5 minutes"),
    especialidadesController.listarEspecialidades
);

router.get(
    "/:id",
    cache("5 minutes"),
    validarId,
    validarCampos,
    especialidadesController.obtenerPorId
);

router.post(
    "/",
    validarEspecialidad,
    validarCampos,
    especialidadesController.crearEspecialidad
);

router.put(
    "/:id",
    validarId,
    validarEspecialidad,
    validarCampos,
    especialidadesController.editarEspecialidad
);

router.delete(
    "/:id",
    validarId,
    validarCampos,
    especialidadesController.eliminarEspecialidad
);

export default router;