import express from "express";
import apicache from "apicache";
import MedicosController from "../../controllers/medicosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarActualizacionMedico, validarMedico } from "../../middleware/medicosValidation.js";

const router = express.Router();

const cache = apicache.middleware;

const medicosController = new MedicosController();

router.get(
    "/",
    cache("5 minutes"),
    medicosController.listarMedicos
);

router.get(
    "/:id",
    cache("5 minutes"),
    validarId,
    validarCampos,
    medicosController.obtenerPorId
);

router.post(
    "/",
    validarMedico,
    validarCampos,
    medicosController.crearMedico
);

router.put(
    "/:id",
    validarId,
    validarActualizacionMedico,
    validarCampos,
    medicosController.editarMedico
);

router.delete(
    "/:id",
    validarId,
    validarCampos,
    medicosController.eliminarMedico
);

export default router;