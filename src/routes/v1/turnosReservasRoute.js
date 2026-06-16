import express from "express";
import { param } from "express-validator";
import TurnosReservasController from "../../controllers/turnosReservasController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import {autenticarJWT,autorizarRoles} from "../../middleware/authValidation.js";

const router = express.Router();

const turnosReservasController = new TurnosReservasController();

router.get(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    turnosReservasController.listarTurnos
);

router.get(
    "/informe-pdf",
    autenticarJWT,
    autorizarRoles(3),
    turnosReservasController.generarInformePDF
);

router.get(
    "/mis-turnos",
    autenticarJWT,
    autorizarRoles([1, 2]),
    turnosReservasController.buscarTurnosUsuario
);

router.get(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    turnosReservasController.obtenerPorId
);

router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    turnosReservasController.crearTurno
);

router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    turnosReservasController.editarTurno
);

router.patch(
    "/:id/atendido",
    autenticarJWT,
    autorizarRoles(1),
    validarId,
    validarCampos,
    turnosReservasController.marcarTurnoAtendido
);

router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    turnosReservasController.eliminarTurno
);

export default router;
