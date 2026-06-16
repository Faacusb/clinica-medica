import express from "express";
import apicache from "apicache";
import PacientesController from "../../controllers/pacientesController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";
import { validarActualizacionPaciente, validarPaciente } from "../../middleware/pacientesValidation.js";


const router = express.Router();
const cache = apicache.middleware;

const pacientesController = new PacientesController();

/**
 * @swagger
 * /v1/pacientes:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Listar pacientes
 *     description: Devuelve todos los pacientes activos. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    cache("5 minutes"),
    pacientesController.listarPacientes
);

/**
 * @swagger
 * /v1/pacientes/{id}:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Obtener paciente por ID
 *     description: Devuelve los datos de un paciente específico. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado.
 *       404:
 *         description: Paciente inexistente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    cache("5 minutes"),
    validarId,
    validarCampos,
    pacientesController.obtenerPorId
);

/**
 * @swagger
 * /v1/pacientes:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Crear paciente
 *     description: Permite registrar un nuevo paciente. Solo disponible para usuarios con rol Administrador (3).
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
 *               - id_obra_social
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 5
 *               id_obra_social:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Paciente creado correctamente.
 *       400:
 *         description: Error de validación.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarPaciente,
    validarCampos,
    pacientesController.crearPaciente
);

/**
 * @swagger
 * /v1/pacientes/{id}:
 *   put:
 *     tags:
 *       - Pacientes
 *     summary: Editar paciente
 *     description: Actualiza los datos de un paciente. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_obra_social
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 5
 *               id_obra_social:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Paciente actualizado correctamente.
 *       404:
 *         description: Paciente no encontrado.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarActualizacionPaciente,
    validarCampos,
    pacientesController.editarPaciente
);

export default router;