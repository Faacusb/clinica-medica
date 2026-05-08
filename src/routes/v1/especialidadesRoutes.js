import express from "express";
import EspecialidadesController from "../../controllers/especialidadesController.js";

const router = express.Router();
const especialidadesController = new EspecialidadesController();

router.get('/', especialidadesController.listarEspecialidades);
router.get('/:id', especialidadesController.obtenerPorId);
router.post('/', especialidadesController.crearEspecialidad);
router.put('/:id', especialidadesController.editarEspecialidad);
router.delete('/:id', especialidadesController.eliminarEspecialidad);

export default router;