import express from "express";
import EspecialidadesController from "../../controllers/especialidadesController.js";
import { validarEspecialidad } from "../../middleware/especialidadesValidation.js";
import { validarCampos } from "../../middleware/validarCampos.js";

const router = express.Router();
const especialidadesController = new EspecialidadesController();

router.get('/', especialidadesController.listarEspecialidades);
router.get('/:id', especialidadesController.obtenerPorId);
router.post('/', validarEspecialidad, validarCampos, especialidadesController.crearEspecialidad);
router.put('/:id', validarEspecialidad, validarCampos, especialidadesController.editarEspecialidad);
router.delete('/:id', especialidadesController.eliminarEspecialidad);

export default router;