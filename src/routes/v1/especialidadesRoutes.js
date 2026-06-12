import express from "express";
import EspecialidadesController from "../../controllers/especialidadesController.js";
import { validarEspecialidad } from "../../middleware/especialidadesValidation.js";
import { validarCampos, validarId} from "../../middleware/validationMiddleware.js";

const router = express.Router();
const especialidadesController = new EspecialidadesController();

router.get('/', especialidadesController.listarEspecialidades);
router.get('/:id', validarId, validarCampos, especialidadesController.obtenerPorId);
router.post('/', validarEspecialidad, validarCampos, especialidadesController.crearEspecialidad);
router.put('/:id', validarId, validarEspecialidad, validarCampos, especialidadesController.editarEspecialidad);
router.delete('/:id', validarId, validarCampos, especialidadesController.eliminarEspecialidad);

export default router;