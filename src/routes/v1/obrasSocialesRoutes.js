import express from "express";
import apicache from "apicache";
import ObrasSocialesController from "../../controllers/obrasSocialesController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarObraSocial, validarActualizacionObraSocial } from "../../middleware/obrasSocialesValidation.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();
const cache = apicache.middleware;

const obrasSocialesController = new ObrasSocialesController();

/**
 * @swagger
 * /v1/obras-sociales:
 *   get:
 *     tags:
 *       - Obras Sociales
 *     summary: Listar obras sociales
 *     description: |
 *       Devuelve todas las obras sociales activas. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de obras sociales obtenida correctamente.
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
    obrasSocialesController.listarObrasSociales
);

/**
 * @swagger
 * /v1/obras-sociales/{id}:
 *   get:
 *     tags:
 *       - Obras Sociales
 *     summary: Obtener obra social por ID
 *     description: |
 *       Obtiene una obra social específica. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     responses:
 *       200:
 *         description: Obra social encontrada.
 *       404:
 *         description: Obra social inexistente.
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
    obrasSocialesController.obtenerPorId
);

/**
 * @swagger
 * /v1/obras-sociales:
 *   post:
 *     tags:
 *       - Obras Sociales
 *     summary: Crear obra social
 *     description: |
 *       Permite registrar una nueva obra social. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - porcentaje_descuento
 *               - es_particular
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: OSDE
 *               descripcion:
 *                 type: string
 *                 example: Plan médico integral
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 20
 *               es_particular:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Obra social creada correctamente.
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
    validarObraSocial,
    validarCampos,
    obrasSocialesController.crearObraSocial
);

/**
 * @swagger
 * /v1/obras-sociales/{id}:
 *   put:
 *     tags:
 *       - Obras Sociales
 *     summary: Editar obra social
 *     description: |
 *       Actualiza los datos de una obra social. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la obra social
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - porcentaje_descuento
 *               - es_particular
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: OSDE
 *               descripcion:
 *                 type: string
 *                 example: Plan médico integral actualizado
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 25
 *               es_particular:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Obra social actualizada correctamente.
 *       404:
 *         description: Obra social no encontrada.
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
    validarActualizacionObraSocial,
    validarCampos,
    obrasSocialesController.editarObraSociales
);

/**
 * @swagger
 * /v1/obras-sociales/{id}:
 *   delete:
 *     tags:
 *       - Obras Sociales
 *     summary: Eliminar obra social
 *     description: |
 *       Realiza una baja lógica de una obra social. Solo disponible para usuarios con rol Administrador (3).
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
 *         description: Obra social eliminada correctamente.
 *       404:
 *         description: Obra social no encontrada.
 *       403:
 *         description: Usuario sin permisos.
 */
router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    obrasSocialesController.eliminarObrasSociales
);

export default router;