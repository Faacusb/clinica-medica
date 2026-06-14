import express from "express";
import { param } from "express-validator";
import MedicosController from "../../controllers/medicosController.js";

const router = express.Router();

const medicosController = new MedicosController();

router.get(
    "/",
    medicosController.listarMedicos
);

router.get(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    medicosController.obtenerPorId
);

router.post(
    "/",
    medicosController.crearMedico
);

router.put(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    medicosController.editarMedico
);

router.delete(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    medicosController.eliminarMedico
);

export default router;