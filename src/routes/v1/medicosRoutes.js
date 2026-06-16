import express from "express";
import apicache from "apicache";
import MedicosController from "../../controllers/medicosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarActualizacionMedico, validarMedico } from "../../middleware/medicosValidation.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();

const cache = apicache.middleware;

const medicosController = new MedicosController();

/**
 * @swagger
 * /v1/medicos:
 *   get:
 *     tags:
 *       - Médicos
 *     summary: Listar médicos
 *     description: Devuelve todos los médicos registrados. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
    "/",
    autenticarJWT,
    autorizarRoles(2, 3),
    cache("5 minutes"),
    medicosController.listarMedicos
);

/**
 * @swagger
 * /v1/medicos/{id}:
 *   get:
 *     tags:
 *       - Médicos
 *     summary: Obtener médico por ID
 *     description: Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico encontrado.
 *       404:
 *         description: Médico inexistente.
 *       401:
 *         description: Usuario no autenticado.
 */
router.get(
    "/:id",
    autenticarJWT,
    autorizarRoles(2, 3),
    cache("5 minutes"),
    validarId,
    validarCampos,
    medicosController.obtenerPorId
);

/**
 * @swagger
 * /v1/medicos:
 *   post:
 *     tags:
 *       - Médicos
 *     summary: Crear médico
 *     description: Permite registrar un nuevo médico. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_especialidad
 *               - matricula
 *               - valor_consulta
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 5
 *               id_especialidad:
 *                 type: integer
 *                 example: 2
 *               matricula:
 *                 type: string
 *                 example: MP-12345
 *               valor_consulta:
 *                 type: number
 *                 example: 15000
 *               descripcion:
 *                 type: string
 *                 example: Especialista en cardiología
 *     responses:
 *       201:
 *         description: Médico creado correctamente.
 *       400:
 *         description: Error de validación.
 *       403:
 *         description: Usuario sin permisos.
 */
router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarMedico,
    validarCampos,
    medicosController.crearMedico
);

/**
 * @swagger
 * /v1/medicos/{id}:
 *   put:
 *     tags:
 *       - Médicos
 *     summary: Editar médico
 *     description: Actualiza los datos de un médico. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_especialidad
 *               - matricula
 *               - valor_consulta
 *             properties:
 *               id_especialidad:
 *                 type: integer
 *                 example: 2
 *               matricula:
 *                 type: string
 *                 example: MP-12345
 *               valor_consulta:
 *                 type: number
 *                 example: 18000
 *               descripcion:
 *                 type: string
 *                 example: Especialista en cardiología y clínica médica
 *     responses:
 *       200:
 *         description: Médico actualizado correctamente.
 *       404:
 *         description: Médico no encontrado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarActualizacionMedico,
    validarCampos,
    medicosController.editarMedico
);

/**
 * @swagger
 * /v1/medicos/{id}:
 *   delete:
 *     tags:
 *       - Médicos
 *     summary: Eliminar médico
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
 *         description: Médico eliminado correctamente.
 *       404:
 *         description: Médico no encontrado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    medicosController.eliminarMedico
);

/**
 * @swagger
 * /v1/medicos/{id}/obras-sociales:
 *   get:
 *     tags:
 *       - Médicos
 *     summary: Listar obras sociales de un médico
 *     description: Solo disponible para usuarios con rol Usuario (2) o Administrador (3).
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
 *         description: Obras sociales obtenidas correctamente.
 *       404:
 *         description: Médico no encontrado.
 */
router.get(
    "/:id/obras-sociales",
    autenticarJWT,
    autorizarRoles(2, 3),
    validarId,
    validarCampos,
    medicosController.listarObrasSocialesPorMedico
);

/**
 * @swagger
 * /v1/medicos/{id}/obras-sociales:
 *   post:
 *     tags:
 *       - Médicos
 *     summary: Asociar médico a obras sociales
 *     description: Permite asociar una o más obras sociales a un médico. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - obras_sociales
 *             properties:
 *               obras_sociales:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_obra_social:
 *                       type: integer
 *                       example: 1
 *     responses:
 *       200:
 *         description: Asociación realizada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       403:
 *         description: Usuario sin permisos.
 */
router.post(
    "/:id/obras-sociales",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    medicosController.asociarMedicoObrasSociales
);

router.get(
    "/especialidad/:id",
    autenticarJWT,
    autorizarRoles(2, 3),
    validarId,
    validarCampos,
    medicosController.listarMedicosPorEspecialidad
);

export default router;