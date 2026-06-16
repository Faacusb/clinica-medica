import express from "express";
import apicache from "apicache";
import EspecialidadesController from "../../controllers/especialidadesController.js";
import { validarEspecialidad } from "../../middleware/especialidadesValidation.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();
const cache = apicache.middleware;

const especialidadesController = new EspecialidadesController();

/**
 * @swagger
 * /v1/especialidades:
 *   get:
 *     tags:
 *       - Especialidades
 *     summary: Listar especialidades
 *     description: Devuelve todas las especialidades activas.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de especialidades obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 */
router.get(
    "/",
    autenticarJWT,
    cache("5 minutes"),
    especialidadesController.listarEspecialidades
);

/**
 * @swagger
 * /v1/especialidades/{id}:
 *   get:
 *     tags:
 *       - Especialidades
 *     summary: Obtener especialidad por ID
 *     description: Devuelve la especialidad del correspondiente ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Especialidad encontrada.
 *       404:
 *         description: Especialidad inexistente.
 *       401:
 *         description: Usuario no autenticado.
 */
router.get(
    "/:id",
    autenticarJWT,
    cache("5 minutes"),
    validarId,
    validarCampos,
    especialidadesController.obtenerPorId
);

/**
 * @swagger
 * /v1/especialidades/{id}:
 *   put:
 *     tags:
 *       - Especialidades
 *     summary: Editar especialidad
 *     description: Actualiza una especialidad existente. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la especialidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología
 *     responses:
 *       200:
 *         description: Especialidad actualizada correctamente.
 *       404:
 *         description: Especialidad no encontrada.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarEspecialidad,
    validarCampos,
    especialidadesController.crearEspecialidad
);

/**
 * @swagger
 * /v1/especialidades/{id}:
 *   put:
 *     tags:
 *       - Especialidades
 *     summary: Editar especialidad
 *     description: Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Cardiología
 *     responses:
 *       200:
 *         description: Especialidad actualizada correctamente.
 *       404:
 *         description: Especialidad no encontrada.
 *       403:
 *         description: Usuario sin permisos.
 */
router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarEspecialidad,
    validarCampos,
    especialidadesController.editarEspecialidad
);

/**
 * @swagger
 * /v1/especialidades/{id}:
 *   delete:
 *     tags:
 *       - Especialidades
 *     summary: Eliminar especialidad
 *     description: Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Especialidad eliminada correctamente.
 *       404:
 *         description: Especialidad no encontrada.
 *       403:
 *         description: Usuario sin permisos.
 */
router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    especialidadesController.eliminarEspecialidad
);

export default router;