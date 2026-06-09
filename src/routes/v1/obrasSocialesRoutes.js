import express from "express";
import { param } from "express-validator";
import ObrasSocialesController from "../../controllers/obrasSocialesController.js";

const router = express.Router();

const obrasSocialesController = new ObrasSocialesController();

// listar obras sociales
router.get(
    "/",
    obrasSocialesController.listar
);

// buscar por id
router.get(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    obrasSocialesController.obtenerPorId
);

// crear nueva obra social
router.post(
    "/",
    obrasSocialesController.crear
);

// editar obra social
router.put(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    obrasSocialesController.editar
);

// eliminar obra social 
router.delete(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    obrasSocialesController.eliminar
);

export default router;