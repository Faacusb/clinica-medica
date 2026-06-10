import express from "express";
import { param } from "express-validator";
import PacientesController from "../../controllers/pacientesController.js";

const router = express.Router();

const pacientesController = new PacientesController();

router.get(
    "/",
    pacientesController.listarPacientes
);

router.get(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    pacientesController.obtenerPorId
);

router.post(
    "/",
    pacientesController.crearPaciente
);

router.put(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    pacientesController.editarPaciente
);

export default router;