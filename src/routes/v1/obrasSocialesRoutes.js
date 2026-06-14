import express from "express";
import { param } from "express-validator";
import ObrasSocialesController from "../../controllers/obrasSocialesController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarObraSocial, validarActualizacionObraSocial } from "../../middleware/obrasSocialesValidation.js";

const router = express.Router();
const obrasSocialesController = new ObrasSocialesController();

router.get("/", obrasSocialesController.listarObrasSociales);
router.get("/:id", validarId,validarCampos, obrasSocialesController.obtenerPorId);
router.post("/", validarObraSocial,validarCampos,obrasSocialesController.crearObraSocial);
router.put("/:id", validarId, validarActualizacionObraSocial, validarCampos,obrasSocialesController.editarObraSociales);
router.delete("/:id",validarId,validarCampos,obrasSocialesController.eliminarObrasSociales);

export default router;