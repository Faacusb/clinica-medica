import express from "express";
import { param } from "express-validator";
import MedicosController from "../../controllers/medicosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarActualizacionMedico, validarMedico } from "../../middleware/medicosValidation.js";

const router = express.Router();

const medicosController = new MedicosController();

router.get("/",medicosController.listarMedicos);
router.get("/:id",validarId, validarCampos,medicosController.obtenerPorId);
router.post("/",validarMedico, validarCampos,medicosController.crearMedico);
router.put("/:id",validarId, validarActualizacionMedico, validarCampos,medicosController.editarMedico);
router.delete("/:id",validarId,validarCampos,medicosController.eliminarMedico);

export default router;