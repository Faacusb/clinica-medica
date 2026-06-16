import express from "express";
import apicache from "apicache";
import UsuariosController from "../../controllers/usuariosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarActualizacionUsuario, validarUsuario } from "../../middleware/usuarioValidation.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();

const cache = apicache.middleware;

const usuariosController = new UsuariosController();

/**
 * @swagger
 * /v1/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Listar usuarios
 *     description: Devuelve todos los usuarios activos. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
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
    usuariosController.listarUsuarios
);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener usuario por ID
 *     description: Devuelve los datos de un usuario específico. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario inexistente.
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
    usuariosController.obtenerPorId
);

/**
 * @swagger
 * /v1/usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear usuario
 *     description: Permite registrar un nuevo usuario. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documento
 *               - apellido
 *               - nombres
 *               - email
 *               - contrasenia
 *               - rol
 *             properties:
 *               documento:
 *                 type: string
 *                 example: "40111222"
 *               apellido:
 *                 type: string
 *                 example: Perez
 *               nombres:
 *                 type: string
 *                 example: Juan
 *               email:
 *                 type: string
 *                 example: juan.perez@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: clave123
 *               foto_path:
 *                 type: string
 *                 example: /uploads/usuarios/foto.jpg
 *               rol:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
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
    validarUsuario,
    validarCampos,
    usuariosController.crearUsuario
);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Editar usuario
 *     description: Actualiza los datos de un usuario. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documento
 *               - apellido
 *               - nombres
 *               - email
 *               - contrasenia
 *               - rol
 *             properties:
 *               documento:
 *                 type: string
 *                 example: "40111222"
 *               apellido:
 *                 type: string
 *                 example: Perez
 *               nombres:
 *                 type: string
 *                 example: Juan
 *               email:
 *                 type: string
 *                 example: juan.perez@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: clave123
 *               foto_path:
 *                 type: string
 *                 example: /uploads/usuarios/foto.jpg
 *               rol:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *       404:
 *         description: Usuario no encontrado.
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
    validarActualizacionUsuario,
    validarCampos,
    usuariosController.editarUsuario
);

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar usuario
 *     description: Realiza una baja lógica de un usuario. Solo disponible para usuarios con rol Administrador (3).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *       404:
 *         description: Usuario no encontrado.
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
    usuariosController.eliminarUsuario
);

export default router;