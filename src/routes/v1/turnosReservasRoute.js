import express from "express";
import { param } from "express-validator";
import TurnosReservasController from "../../controllers/turnosReservasController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import {autenticarJWT,autorizarRoles} from "../../middleware/authValidation.js";
import { validarActualizacionTurnoReserva, validarTurnoReserva } from "../../middleware/turnosReservasValidation.js";

const router = express.Router();

const turnosReservasController = new TurnosReservasController();

/**
 * @swagger
 * /v1/turnos-reservas:
 *   get:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Listar turnos
 *     description: Devuelve todos los turnos registrados. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    turnosReservasController.listarTurnos
);

/**
 * @swagger
 * /v1/turnos-reservas/informe-pdf:
 *   get:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Generar informe PDF de turnos
 *     description: Genera y descarga un informe PDF con todos los turnos registrados. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informe PDF generado correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
    "/informe-pdf",
    autenticarJWT,
    autorizarRoles(3),
    turnosReservasController.generarInformePDF
);

/**
 * @swagger
 * /v1/turnos-reservas/mis-turnos:
 *   get:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Obtener mis turnos
 *     description: Devuelve los turnos asociados al usuario autenticado. Disponible para Médicos (1) y Pacientes (2).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
    "/mis-turnos",
    autenticarJWT,
    autorizarRoles([1, 2]),
    turnosReservasController.buscarTurnosUsuario
);

/**
 * @swagger
 * /v1/turnos-reservas/{id}:
 *   get:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Obtener turno por ID
 *     description: Devuelve la información de un turno específico. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno encontrado.
 *       404:
 *         description: Turno inexistente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.get(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    turnosReservasController.obtenerPorId
);

/**
 * @swagger
 * /v1/turnos-reservas:
 *   post:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Crear turno
 *     description: Registra un nuevo turno. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_medico
 *               - id_paciente
 *               - fecha_hora
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               id_paciente:
 *                 type: integer
 *                 example: 2
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-20T15:30:00"
 *     responses:
 *       201:
 *         description: Turno creado correctamente.
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
    validarTurnoReserva,
    validarCampos,
    turnosReservasController.crearTurno
);

/**
 * @swagger
 * /v1/turnos-reservas/{id}:
 *   put:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Editar turno
 *     description: Actualiza los datos de un turno existente. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_medico:
 *                 type: integer
 *                 example: 1
 *               id_paciente:
 *                 type: integer
 *                 example: 2
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-20T15:30:00"
 *     responses:
 *       200:
 *         description: Turno actualizado correctamente.
 *       404:
 *         description: Turno no encontrado.
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
    validarActualizacionTurnoReserva,
    validarCampos,
    turnosReservasController.editarTurno
);

/**
 * @swagger
 * /v1/turnos-reservas/{id}/atendido:
 *   patch:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Marcar turno como atendido
 *     description: Permite a un médico marcar un turno como atendido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - atendido
 *             properties:
 *               atendido:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Estado del turno actualizado correctamente.
 *       404:
 *         description: Turno no encontrado.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.patch(
    "/:id/atendido",
    autenticarJWT,
    autorizarRoles(1),
    validarId,
    validarCampos,
    turnosReservasController.marcarTurnoAtendido
);

/**
 * @swagger
 * /v1/turnos-reservas/{id}:
 *   delete:
 *     tags:
 *       - Turnos y Reservas
 *     summary: Eliminar turno
 *     description: Elimina un turno existente. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno eliminado correctamente.
 *       404:
 *         description: Turno no encontrado.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: Usuario sin permisos.
 */
router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    turnosReservasController.eliminarTurno
);

export default router;
