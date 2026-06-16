import express from "express";
import { param } from "express-validator";
import TurnosReservasController from "../../controllers/turnosReservasController.js";

const router = express.Router();

const turnosReservasController = new TurnosReservasController();

router.get(
    "/",
    turnosReservasController.listarTurnos
);

router.get(
    "/informe-pdf",
    turnosReservasController.generarInformePDF
);

router.get(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    turnosReservasController.obtenerPorId
);

router.post(
    "/",
    turnosReservasController.crearTurno
);

router.put(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    turnosReservasController.editarTurno
);

router.delete(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    turnosReservasController.eliminarTurno
);

export default router;
