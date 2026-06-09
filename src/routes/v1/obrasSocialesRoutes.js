import express from "express";
import { param } from "express-validator";
import ObrasSocialesController from "../../controllers/obrasSocialesController.js";

const router = express.Router();

const obrasSocialesController = new ObrasSocialesController();

// listar obras sociales
router.get(
    "/",
    obrasSocialesController.listarObrasSociales
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
    obrasSocialesController.crearObraSocial
);

// editar obra social
router.put(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    obrasSocialesController.editarObraSociales
);

// eliminar obra social 
router.delete(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    obrasSocialesController.eliminarObrasSociales
);

export default router;