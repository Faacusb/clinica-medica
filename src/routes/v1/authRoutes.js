import express from "express";
import { check } from "express-validator";

import AuthController from "../../controllers/authController.js";
import { validarCampos } from "../../middleware/validationMiddleware.js";

import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();

const authController = new AuthController();

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Iniciar sesión
 *     description: Permite autenticarse y obtener un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasenia
 *             properties:
 *               email:
 *                 type: string
 *                 example: lopmar@correo.com
 *               contrasenia:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 *       400:
 *         description: Error de validación
 */
router.post(
    "/login",
    [
        check("email")
            .notEmpty()
            .withMessage("El correo electrónico es requerido")
            .isEmail()
            .withMessage("Formato de correo inválido"),

        check("contrasenia")
            .notEmpty()
            .withMessage("La contraseña es requerida"),

        validarCampos
    ],
    authController.login
);

/**
 * @swagger
 * /v1/auth/perfil:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener perfil del usuario autenticado
 *     description: Devuelve los datos del usuario obtenidos desde el token JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *       401:
 *         description: Token inválido o ausente
 */
router.get(
    "/perfil",
    autenticarJWT,
    (req, res) => {

        res.json({
            estado: "OK",
            usuario: req.user
        });
    }
);

/**
 * @swagger
 * /v1/auth/admin:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Ruta protegida para administradores
 *     description: Verifica autenticación y autorización por rol.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso autorizado
 *       401:
 *         description: Usuario no autenticado
 *       403:
 *         description: Usuario sin permisos
 */
router.get(
    "/admin",
    autenticarJWT,
    autorizarRoles(1),
    (req, res) => {

        res.json({
            estado: "OK",
            mensaje: "Bienvenido administrador",
            usuario: req.user
        });
    }
);
export default router;