import express from "express";
import { param } from "express-validator";
import MedicosObrasSocialesController from "../../controllers/MedicosObrasSocialesController.js";

const router = express.Router();

const medicosObrasSocialesController = new MedicosObrasSocialesController();


router.get(
    "/",
    medicosObrasSocialesController.listarMedicosObrasSociales
);

router.get(
    "/:id",
    param("id").isInt().withMessage("El ID debe ser numérico"),
    medicosObrasSocialesController.obtenerPorId
);

router.post(
    "/",
    medicosObrasSocialesController.crearMedicoObraSocial
);

router.put(
    "/:id",

    param("id") .isInt().withMessage("El ID debe ser numérico"),

    medicosObrasSocialesController.editarMedicoObraSocial
);

router.delete(
    "/:id",

    param("id") .isInt().withMessage("El ID debe ser numérico"),

    medicosObrasSocialesController.eliminarMedicoObraSocial
);

export default router;